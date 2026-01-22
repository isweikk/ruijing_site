# 快速开始

欢迎使用 锐境 AI！本指南将帮助您快速上手我们的AI平台。

---

## 第一步：注册账号

1. 访问 [锐境 AI 平台](https://app.ruijing.ai)
2. 点击"注册"按钮
3. 填写您的邮箱和密码
4. 验证邮箱地址
5. 完成注册

!!! tip "提示"
    注册后即可获得免费试用额度，无需绑定信用卡！

---

## 第二步：获取API密钥

登录后，前往控制台获取您的API密钥：

1. 进入"设置" → "API密钥"
2. 点击"创建新密钥"
3. 为密钥命名（如：开发环境、生产环境）
4. 复制并安全保存您的API密钥

!!! warning "安全提示"
    请妥善保管您的API密钥，不要将其提交到公开的代码仓库中！

---

## 第三步：安装SDK

我们提供多种编程语言的SDK，选择您熟悉的语言：

=== "Python"

    ```bash
    pip install ruijing-ai
    ```

=== "JavaScript/Node.js"

    ```bash
    npm install ruijing-ai
    ```

=== "Java"

    ```xml
    <dependency>
        <groupId>ai.ruijing</groupId>
        <artifactId>ruijing-ai-sdk</artifactId>
        <version>1.0.0</version>
    </dependency>
    ```

=== "Go"

    ```bash
    go get github.com/ruijing-ai/ruijing-go
    ```

---

## 第四步：第一个API调用

### Python 示例

```python
from ruijing_ai import Client

# 初始化客户端
client = Client(api_key="your_api_key_here")

# 调用文本生成API
response = client.chat.completions.create(
    model="ruijing-gpt-2.0",
    messages=[
        {"role": "system", "content": "你是一个有帮助的AI助手"},
        {"role": "user", "content": "介绍一下人工智能的应用场景"}
    ],
    temperature=0.7,
    max_tokens=500
)

print(response.choices[0].message.content)
```

### JavaScript 示例

```javascript
const { RuijingAI } = require('ruijing-ai');

// 初始化客户端
const client = new RuijingAI({
  apiKey: 'your_api_key_here'
});

// 调用文本生成API
async function main() {
  const response = await client.chat.completions.create({
    model: 'ruijing-gpt-2.0',
    messages: [
      { role: 'system', content: '你是一个有帮助的AI助手' },
      { role: 'user', content: '介绍一下人工智能的应用场景' }
    ],
    temperature: 0.7,
    max_tokens: 500
  });

  console.log(response.choices[0].message.content);
}

main();
```

### cURL 示例

```bash
curl https://api.ruijing.ai/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer your_api_key_here" \
  -d '{
    "model": "ruijing-gpt-2.0",
    "messages": [
      {"role": "system", "content": "你是一个有帮助的AI助手"},
      {"role": "user", "content": "介绍一下人工智能的应用场景"}
    ],
    "temperature": 0.7,
    "max_tokens": 500
  }'
```

---

## 核心功能

### 1. 文本生成

使用我们的大语言模型生成高质量文本：

```python
response = client.chat.completions.create(
    model="ruijing-gpt-2.0",
    messages=[
        {"role": "user", "content": "写一首关于春天的诗"}
    ]
)
```

### 2. 文本分类

对文本进行分类和情感分析：

```python
response = client.classify(
    text="这个产品真的很棒，我非常喜欢！",
    categories=["正面", "负面", "中性"]
)
```

### 3. 文本嵌入

将文本转换为向量表示：

```python
embeddings = client.embeddings.create(
    model="ruijing-embedding",
    input="人工智能正在改变世界"
)
```

### 4. 图像识别

识别图像中的物体和场景：

```python
response = client.vision.analyze(
    image_url="https://example.com/image.jpg",
    features=["objects", "labels", "text"]
)
```

---

## 参数说明

### 常用参数

| 参数 | 类型 | 说明 | 默认值 |
|------|------|------|--------|
| `model` | string | 模型名称 | 必填 |
| `messages` | array | 对话消息列表 | 必填 |
| `temperature` | float | 控制随机性 (0-2) | 0.7 |
| `max_tokens` | integer | 最大生成长度 | 1000 |
| `top_p` | float | 核采样参数 (0-1) | 1.0 |
| `frequency_penalty` | float | 频率惩罚 (-2 to 2) | 0 |
| `presence_penalty` | float | 存在惩罚 (-2 to 2) | 0 |

### Temperature 参数说明

- **0.0-0.3**：更确定性的输出，适合事实性任务
- **0.4-0.7**：平衡创造性和准确性
- **0.8-1.0**：更有创造性的输出
- **1.0+**：高度随机和创造性

---

## 错误处理

正确处理API错误是很重要的：

```python
from ruijing_ai import Client, RuijingError

client = Client(api_key="your_api_key")

try:
    response = client.chat.completions.create(
        model="ruijing-gpt-2.0",
        messages=[{"role": "user", "content": "Hello"}]
    )
except RuijingError as e:
    print(f"API错误: {e.message}")
    print(f"错误代码: {e.code}")
    print(f"请求ID: {e.request_id}")
```

### 常见错误码

| 错误码 | 说明 | 解决方法 |
|--------|------|----------|
| 401 | 认证失败 | 检查API密钥是否正确 |
| 429 | 请求过多 | 降低请求频率或升级套餐 |
| 500 | 服务器错误 | 稍后重试或联系支持 |
| 503 | 服务不可用 | 系统维护中，请稍后重试 |

---

## 最佳实践

### 1. 安全存储API密钥

使用环境变量存储API密钥：

```python
import os
from ruijing_ai import Client

api_key = os.getenv("RUIJING_API_KEY")
client = Client(api_key=api_key)
```

### 2. 实现重试机制

```python
import time
from ruijing_ai import Client, RuijingError

def call_api_with_retry(client, max_retries=3):
    for i in range(max_retries):
        try:
            return client.chat.completions.create(
                model="ruijing-gpt-2.0",
                messages=[{"role": "user", "content": "Hello"}]
            )
        except RuijingError as e:
            if i == max_retries - 1:
                raise
            time.sleep(2 ** i)  # 指数退避
```

### 3. 流式响应

对于长文本生成，使用流式响应：

```python
response = client.chat.completions.create(
    model="ruijing-gpt-2.0",
    messages=[{"role": "user", "content": "写一篇长文章"}],
    stream=True
)

for chunk in response:
    if chunk.choices[0].delta.content:
        print(chunk.choices[0].delta.content, end="")
```

### 4. 批量处理

处理多个请求时使用批量API：

```python
requests = [
    {"messages": [{"role": "user", "content": "问题1"}]},
    {"messages": [{"role": "user", "content": "问题2"}]},
    {"messages": [{"role": "user", "content": "问题3"}]}
]

responses = client.batch.create(
    model="ruijing-gpt-2.0",
    requests=requests
)
```

---

## 监控和调试

### 查看请求日志

在控制台中查看所有API请求的详细日志：

1. 登录控制台
2. 进入"监控" → "API日志"
3. 查看请求详情、响应时间、错误信息等

### 使用调试模式

```python
client = Client(
    api_key="your_api_key",
    debug=True  # 启用调试模式
)
```

---

## 配额和限制

### 免费套餐

- 每月 10,000 tokens
- 每分钟 3 次请求
- 基础模型访问

### 专业套餐

- 每月 1,000,000 tokens
- 每分钟 60 次请求
- 所有模型访问
- 优先支持

### 企业套餐

- 自定义配额
- 无限制请求频率
- 专属模型
- 7x24 技术支持

[查看详细定价 :material-currency-usd:](https://app.ruijing.ai/pricing){ .md-button }

---

## 下一步

恭喜！您已经完成了快速入门。接下来可以：

<div class="grid cards" markdown>

-   :material-book-open-variant:{ .lg .middle } __深入学习__

    ---

    阅读完整的API文档，了解所有功能

    [:octicons-arrow-right-24: API文档](api.md)

-   :material-code-braces:{ .lg .middle } __查看示例__

    ---

    浏览更多代码示例和最佳实践

    [:octicons-arrow-right-24: 示例代码](https://github.com/ruijing-ai/examples)

-   :material-forum:{ .lg .middle } __加入社区__

    ---

    与其他开发者交流经验

    [:octicons-arrow-right-24: 开发者社区](../about/index.md)

-   :material-help-circle:{ .lg .middle } __获取帮助__

    ---

    遇到问题？查看FAQ或联系支持

    [:octicons-arrow-right-24: 常见问题](faq.md)

</div>

---

## 需要帮助？

如果您在使用过程中遇到任何问题：

- 📧 发送邮件至 support@ruijing.ai
- 💬 访问我们的[开发者论坛](https://forum.ruijing.ai)
- 📚 查看[完整文档](api.md)
- 🎥 观看[视频教程](https://youtube.com/@ruijing-ai)

[联系技术支持 :material-lifebuoy:](../about/index.md){ .md-button .md-button--primary }
