# API 文档

锐境 AI 提供强大而灵活的RESTful API，让您轻松集成AI能力到您的应用中。

---

## 基础信息

### API端点

```
https://api.ruijing.ai/v1
```

### 认证方式

所有API请求都需要在HTTP头中包含API密钥：

```http
Authorization: Bearer YOUR_API_KEY
```

### 请求格式

```http
POST /v1/chat/completions HTTP/1.1
Host: api.ruijing.ai
Content-Type: application/json
Authorization: Bearer YOUR_API_KEY

{
  "model": "ruijing-gpt-2.0",
  "messages": [...]
}
```

### 响应格式

成功响应：

```json
{
  "id": "chatcmpl-123",
  "object": "chat.completion",
  "created": 1677652288,
  "model": "ruijing-gpt-2.0",
  "choices": [{
    "index": 0,
    "message": {
      "role": "assistant",
      "content": "响应内容"
    },
    "finish_reason": "stop"
  }],
  "usage": {
    "prompt_tokens": 9,
    "completion_tokens": 12,
    "total_tokens": 21
  }
}
```

错误响应：

```json
{
  "error": {
    "message": "错误描述",
    "type": "invalid_request_error",
    "code": "invalid_api_key"
  }
}
```

---

## 聊天补全 API

### 创建聊天补全

生成对话响应。

**端点**

```
POST /v1/chat/completions
```

**请求参数**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| model | string | 是 | 模型ID |
| messages | array | 是 | 消息列表 |
| temperature | number | 否 | 0-2，默认0.7 |
| max_tokens | integer | 否 | 最大生成长度 |
| top_p | number | 否 | 0-1，默认1 |
| stream | boolean | 否 | 是否流式返回 |
| stop | string/array | 否 | 停止序列 |

**消息格式**

```json
{
  "role": "system|user|assistant",
  "content": "消息内容"
}
```

**示例请求**

=== "Python"

    ```python
    import requests
    
    url = "https://api.ruijing.ai/v1/chat/completions"
    headers = {
        "Authorization": "Bearer YOUR_API_KEY",
        "Content-Type": "application/json"
    }
    data = {
        "model": "ruijing-gpt-2.0",
        "messages": [
            {"role": "system", "content": "你是一个有帮助的助手"},
            {"role": "user", "content": "你好"}
        ],
        "temperature": 0.7
    }
    
    response = requests.post(url, headers=headers, json=data)
    print(response.json())
    ```

=== "JavaScript"

    ```javascript
    const response = await fetch('https://api.ruijing.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer YOUR_API_KEY',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'ruijing-gpt-2.0',
        messages: [
          {role: 'system', content: '你是一个有帮助的助手'},
          {role: 'user', content: '你好'}
        ],
        temperature: 0.7
      })
    });
    
    const data = await response.json();
    console.log(data);
    ```

=== "cURL"

    ```bash
    curl https://api.ruijing.ai/v1/chat/completions \
      -H "Authorization: Bearer YOUR_API_KEY" \
      -H "Content-Type: application/json" \
      -d '{
        "model": "ruijing-gpt-2.0",
        "messages": [
          {"role": "system", "content": "你是一个有帮助的助手"},
          {"role": "user", "content": "你好"}
        ],
        "temperature": 0.7
      }'
    ```

**流式响应**

```python
response = requests.post(
    url,
    headers=headers,
    json={**data, "stream": True},
    stream=True
)

for line in response.iter_lines():
    if line:
        print(line.decode('utf-8'))
```

---

## 文本嵌入 API

### 创建嵌入向量

将文本转换为向量表示。

**端点**

```
POST /v1/embeddings
```

**请求参数**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| model | string | 是 | 模型ID |
| input | string/array | 是 | 输入文本 |

**示例请求**

```python
data = {
    "model": "ruijing-embedding",
    "input": "人工智能正在改变世界"
}

response = requests.post(
    "https://api.ruijing.ai/v1/embeddings",
    headers=headers,
    json=data
)
```

**响应示例**

```json
{
  "object": "list",
  "data": [
    {
      "object": "embedding",
      "embedding": [0.0023, -0.009, ...],
      "index": 0
    }
  ],
  "model": "ruijing-embedding",
  "usage": {
    "prompt_tokens": 8,
    "total_tokens": 8
  }
}
```

---

## 图像分析 API

### 分析图像

识别图像中的物体、场景和文本。

**端点**

```
POST /v1/vision/analyze
```

**请求参数**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| image | string | 是 | 图像URL或base64 |
| features | array | 是 | 分析特征 |

**支持的特征**

- `objects`: 物体检测
- `labels`: 标签识别
- `text`: 文字识别（OCR）
- `faces`: 人脸检测
- `colors`: 颜色分析

**示例请求**

```python
data = {
    "image": "https://example.com/image.jpg",
    "features": ["objects", "labels", "text"]
}

response = requests.post(
    "https://api.ruijing.ai/v1/vision/analyze",
    headers=headers,
    json=data
)
```

---

## 语音识别 API

### 语音转文字

将音频转换为文本。

**端点**

```
POST /v1/audio/transcriptions
```

**请求参数**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| file | file | 是 | 音频文件 |
| model | string | 是 | 模型ID |
| language | string | 否 | 语言代码 |

**支持格式**

mp3, mp4, mpeg, mpga, m4a, wav, webm

**示例请求**

```python
with open("audio.mp3", "rb") as f:
    files = {"file": f}
    data = {"model": "ruijing-whisper"}
    
    response = requests.post(
        "https://api.ruijing.ai/v1/audio/transcriptions",
        headers={"Authorization": f"Bearer {api_key}"},
        files=files,
        data=data
    )
```

---

## 模型列表

### 可用模型

**文本生成模型**

| 模型 | 说明 | 上下文长度 |
|------|------|-----------|
| ruijing-gpt-2.0 | 最新大语言模型 | 32K |
| ruijing-gpt-1.5 | 稳定版本 | 16K |
| ruijing-gpt-lite | 轻量级版本 | 8K |

**嵌入模型**

| 模型 | 说明 | 维度 |
|------|------|------|
| ruijing-embedding | 通用嵌入模型 | 1536 |
| ruijing-embedding-large | 大型嵌入模型 | 3072 |

**视觉模型**

| 模型 | 说明 |
|------|------|
| ruijing-vision | 图像分析模型 |

**语音模型**

| 模型 | 说明 |
|------|------|
| ruijing-whisper | 语音识别模型 |
| ruijing-tts | 语音合成模型 |

---

## 错误处理

### 错误码

| 状态码 | 错误类型 | 说明 |
|--------|----------|------|
| 400 | invalid_request_error | 请求参数错误 |
| 401 | authentication_error | 认证失败 |
| 403 | permission_error | 权限不足 |
| 404 | not_found_error | 资源不存在 |
| 429 | rate_limit_error | 请求过多 |
| 500 | api_error | 服务器错误 |
| 503 | service_unavailable | 服务不可用 |

### 错误处理示例

```python
try:
    response = requests.post(url, headers=headers, json=data)
    response.raise_for_status()
    result = response.json()
except requests.exceptions.HTTPError as e:
    error = e.response.json()
    print(f"错误: {error['error']['message']}")
    print(f"类型: {error['error']['type']}")
except Exception as e:
    print(f"请求失败: {str(e)}")
```

---

## 速率限制

### 限制规则

| 套餐 | 每分钟请求数 | 每天tokens |
|------|-------------|-----------|
| 免费版 | 3 | 10,000 |
| 专业版 | 60 | 1,000,000 |
| 企业版 | 无限制 | 自定义 |

### 响应头

```http
X-RateLimit-Limit: 60
X-RateLimit-Remaining: 59
X-RateLimit-Reset: 1677652400
```

### 处理速率限制

```python
import time

def call_api_with_retry(max_retries=3):
    for i in range(max_retries):
        try:
            response = requests.post(url, headers=headers, json=data)
            if response.status_code == 429:
                retry_after = int(response.headers.get('Retry-After', 60))
                time.sleep(retry_after)
                continue
            return response.json()
        except Exception as e:
            if i == max_retries - 1:
                raise
            time.sleep(2 ** i)
```

---

## SDK 使用

### Python SDK

**安装**

```bash
pip install ruijing-ai
```

**使用**

```python
from ruijing_ai import Client

client = Client(api_key="YOUR_API_KEY")

response = client.chat.completions.create(
    model="ruijing-gpt-2.0",
    messages=[
        {"role": "user", "content": "Hello"}
    ]
)

print(response.choices[0].message.content)
```

### JavaScript SDK

**安装**

```bash
npm install ruijing-ai
```

**使用**

```javascript
const { RuijingAI } = require('ruijing-ai');

const client = new RuijingAI({
  apiKey: 'YOUR_API_KEY'
});

const response = await client.chat.completions.create({
  model: 'ruijing-gpt-2.0',
  messages: [{role: 'user', content: 'Hello'}]
});

console.log(response.choices[0].message.content);
```

---

## 最佳实践

### 1. 安全性

```python
import os

# 使用环境变量存储API密钥
api_key = os.getenv("RUIJING_API_KEY")
```

### 2. 错误重试

```python
from tenacity import retry, stop_after_attempt, wait_exponential

@retry(
    stop=stop_after_attempt(3),
    wait=wait_exponential(multiplier=1, min=4, max=10)
)
def call_api():
    return client.chat.completions.create(...)
```

### 3. 批量处理

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

### 4. 流式响应

```python
# 对于长文本，使用流式响应
stream = client.chat.completions.create(
    model="ruijing-gpt-2.0",
    messages=[{"role": "user", "content": "写一篇长文章"}],
    stream=True
)

for chunk in stream:
    if chunk.choices[0].delta.content:
        print(chunk.choices[0].delta.content, end="")
```

---

## 更多资源

<div class="grid cards" markdown>

-   :material-book-open:{ .lg .middle } __快速开始__

    ---

    从零开始使用API

    [:octicons-arrow-right-24: 查看教程](getting-started.md)

-   :material-code-braces:{ .lg .middle } __示例代码__

    ---

    完整的代码示例

    [:octicons-arrow-right-24: GitHub](https://github.com/ruijing-ai/examples)

-   :material-help-circle:{ .lg .middle } __常见问题__

    ---

    解答常见疑问

    [:octicons-arrow-right-24: 查看FAQ](faq.md)

-   :material-forum:{ .lg .middle } __开发者社区__

    ---

    获取帮助和支持

    [:octicons-arrow-right-24: 联系我们](../about/index.md)

</div>

---

*完整的API参考文档持续更新中...*
