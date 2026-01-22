# 开发指南

本指南将帮助您深入了解如何使用 锐境 AI 进行开发。

---

## 开发环境设置

### Python 环境

```bash
# 创建虚拟环境
python -m venv venv

# 激活虚拟环境
# Windows
venv\Scripts\activate
# Linux/Mac
source venv/bin/activate

# 安装SDK
pip install ruijing-ai
```

### Node.js 环境

```bash
# 初始化项目
npm init -y

# 安装SDK
npm install ruijing-ai
```

---

## 高级功能

### 流式响应

对于长文本生成，使用流式响应可以提供更好的用户体验。

```python
from ruijing_ai import Client

client = Client(api_key="your_key")

stream = client.chat.completions.create(
    model="ruijing-gpt-2.0",
    messages=[{"role": "user", "content": "写一篇长文章"}],
    stream=True
)

for chunk in stream:
    if chunk.choices[0].delta.content:
        print(chunk.choices[0].delta.content, end="", flush=True)
```

### 函数调用

让模型调用外部函数。

```python
functions = [
    {
        "name": "get_weather",
        "description": "获取指定城市的天气",
        "parameters": {
            "type": "object",
            "properties": {
                "city": {
                    "type": "string",
                    "description": "城市名称"
                }
            },
            "required": ["city"]
        }
    }
]

response = client.chat.completions.create(
    model="ruijing-gpt-2.0",
    messages=[{"role": "user", "content": "北京今天天气怎么样？"}],
    functions=functions
)
```

### 批量处理

```python
# 批量处理多个请求
requests = [
    {"messages": [{"role": "user", "content": f"问题{i}"}]}
    for i in range(10)
]

responses = client.batch.create(
    model="ruijing-gpt-2.0",
    requests=requests
)
```

---

## 最佳实践

### 1. 提示词工程

**清晰的指令**

```python
# 好的提示词
prompt = """
请分析以下文本的情感倾向，并给出理由。

文本：这个产品真的很棒！

请按以下格式回答：
情感：[正面/负面/中性]
理由：[具体理由]
"""

# 不好的提示词
prompt = "分析情感"
```

**提供示例**

```python
prompt = """
将以下句子翻译成英文。

示例：
中文：你好
英文：Hello

中文：谢谢
英文：Thank you

现在翻译：
中文：再见
英文：
"""
```

### 2. 错误处理

```python
from ruijing_ai import Client, RuijingError
import time

def call_with_retry(max_retries=3):
    for i in range(max_retries):
        try:
            response = client.chat.completions.create(...)
            return response
        except RuijingError as e:
            if e.code == 429:  # 速率限制
                time.sleep(2 ** i)
                continue
            raise
```

### 3. 性能优化

**使用缓存**

```python
from functools import lru_cache

@lru_cache(maxsize=100)
def get_embedding(text):
    return client.embeddings.create(
        model="ruijing-embedding",
        input=text
    )
```

**并发请求**

```python
import asyncio
from ruijing_ai import AsyncClient

async def process_batch(texts):
    client = AsyncClient(api_key="your_key")
    tasks = [
        client.chat.completions.create(
            model="ruijing-gpt-2.0",
            messages=[{"role": "user", "content": text}]
        )
        for text in texts
    ]
    return await asyncio.gather(*tasks)
```

---

## 常见模式

### 对话系统

```python
class ChatBot:
    def __init__(self, api_key):
        self.client = Client(api_key=api_key)
        self.messages = []
    
    def chat(self, user_input):
        self.messages.append({
            "role": "user",
            "content": user_input
        })
        
        response = self.client.chat.completions.create(
            model="ruijing-gpt-2.0",
            messages=self.messages
        )
        
        assistant_message = response.choices[0].message.content
        self.messages.append({
            "role": "assistant",
            "content": assistant_message
        })
        
        return assistant_message
```

### 文档问答

```python
def document_qa(document, question):
    prompt = f"""
    基于以下文档回答问题。
    
    文档：
    {document}
    
    问题：{question}
    
    回答：
    """
    
    response = client.chat.completions.create(
        model="ruijing-gpt-2.0",
        messages=[{"role": "user", "content": prompt}]
    )
    
    return response.choices[0].message.content
```

---

## 调试技巧

### 启用调试模式

```python
client = Client(
    api_key="your_key",
    debug=True
)
```

### 查看请求详情

```python
import logging

logging.basicConfig(level=logging.DEBUG)
```

---

## 更多资源

- [API参考文档](api.md)
- [示例代码](https://github.com/ruijing-ai/examples)

---

*持续学习，不断进步！*
