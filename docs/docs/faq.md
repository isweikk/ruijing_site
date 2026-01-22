# 常见问题

这里汇总了用户最常问的问题和解答。

---

## 账户相关

??? question "如何注册账号？"

    1. 访问 [锐境 AI 平台](https://app.ruijing.ai)
    2. 点击"注册"按钮
    3. 填写邮箱和密码
    4. 验证邮箱地址
    5. 完成注册

??? question "忘记密码怎么办？"

    1. 点击登录页面的"忘记密码"
    2. 输入注册邮箱
    3. 查收重置密码邮件
    4. 点击邮件中的链接重置密码

??? question "如何修改账户信息？"

    登录后进入"设置" → "账户信息"，可以修改：
    - 用户名
    - 邮箱
    - 密码
    - 个人资料

??? question "如何删除账户？"

    如需删除账户，请联系客服 support@ruijing.ai，我们会在3个工作日内处理。

---

## API使用

??? question "如何获取API密钥？"

    1. 登录控制台
    2. 进入"设置" → "API密钥"
    3. 点击"创建新密钥"
    4. 为密钥命名并保存

??? question "API密钥泄露了怎么办？"

    立即在控制台中删除泄露的密钥，并创建新的密钥。

??? question "为什么API返回401错误？"

    可能的原因：
    - API密钥错误或已过期
    - 未在请求头中包含Authorization
    - 密钥格式不正确

    解决方法：
    ```python
    headers = {
        "Authorization": "Bearer YOUR_API_KEY",
        "Content-Type": "application/json"
    }
    ```

??? question "如何处理429错误（请求过多）？"

    实现指数退避重试：
    ```python
    import time
    
    def call_with_retry(max_retries=3):
        for i in range(max_retries):
            try:
                response = requests.post(url, headers=headers, json=data)
                if response.status_code == 429:
                    time.sleep(2 ** i)
                    continue
                return response.json()
            except Exception as e:
                if i == max_retries - 1:
                    raise
    ```

---

## 计费相关

??? question "如何查看使用量？"

    登录控制台，进入"使用统计"页面，可以查看：
    - API调用次数
    - Token使用量
    - 费用明细
    - 历史记录

??? question "免费额度用完后会怎样？"

    免费额度用完后，API请求会返回配额不足的错误。您需要升级到付费套餐才能继续使用。

??? question "如何升级套餐？"

    1. 登录控制台
    2. 进入"套餐管理"
    3. 选择合适的套餐
    4. 完成支付

??? question "支持哪些支付方式？"

    我们支持：
    - 支付宝
    - 微信支付
    - 银行转账
    - 信用卡（企业版）

??? question "如何开具发票？"

    1. 进入"账单管理"
    2. 选择需要开票的订单
    3. 填写发票信息
    4. 提交申请
    5. 7个工作日内收到电子发票

---

## 技术问题

??? question "支持哪些编程语言？"

    我们提供官方SDK：
    - Python
    - JavaScript/Node.js
    - Java
    - Go
    
    也可以使用任何支持HTTP请求的语言通过REST API调用。

??? question "如何提高响应速度？"

    优化建议：
    1. 使用流式响应
    2. 减少max_tokens参数
    3. 使用更快的模型（如lite版本）
    4. 启用缓存
    5. 选择就近的服务器

??? question "如何处理超时？"

    ```python
    import requests
    
    try:
        response = requests.post(
            url,
            headers=headers,
            json=data,
            timeout=30  # 设置30秒超时
        )
    except requests.exceptions.Timeout:
        print("请求超时，请重试")
    ```

??? question "支持批量处理吗？"

    支持。使用批量API可以一次处理多个请求：
    ```python
    responses = client.batch.create(
        model="ruijing-gpt-2.0",
        requests=[
            {"messages": [{"role": "user", "content": "问题1"}]},
            {"messages": [{"role": "user", "content": "问题2"}]}
        ]
    )
    ```

---

## 模型相关

??? question "如何选择合适的模型？"

    根据需求选择：
    - **ruijing-gpt-2.0**：最强性能，适合复杂任务
    - **ruijing-gpt-1.5**：平衡性能和成本
    - **ruijing-gpt-lite**：快速响应，适合简单任务

??? question "模型支持多少上下文长度？"

    - ruijing-gpt-2.0: 32K tokens
    - ruijing-gpt-1.5: 16K tokens
    - ruijing-gpt-lite: 8K tokens

??? question "如何计算token数量？"

    大致估算：
    - 中文：1个字 ≈ 1.5-2 tokens
    - 英文：1个单词 ≈ 1-2 tokens
    
    精确计算可使用我们的tokenizer工具。

??? question "支持微调模型吗？"

    企业版支持模型微调。联系我们的销售团队了解详情。

---

## 数据安全

??? question "我的数据安全吗？"

    我们采取多重安全措施：
    - 数据传输加密（TLS 1.3）
    - 数据存储加密
    - 访问控制和审计
    - 通过ISO 27001认证

??? question "你们会使用我的数据训练模型吗？"

    不会。我们承诺：
    - 不使用用户数据训练模型
    - 不与第三方共享数据
    - 定期删除历史数据

??? question "支持私有部署吗？"

    企业版支持私有部署，可以部署在：
    - 私有云
    - 本地数据中心
    - 专属VPC

---

## 功能相关

??? question "支持流式响应吗？"

    支持。设置`stream=True`即可：
    ```python
    response = client.chat.completions.create(
        model="ruijing-gpt-2.0",
        messages=[...],
        stream=True
    )
    
    for chunk in response:
        print(chunk.choices[0].delta.content, end="")
    ```

??? question "支持多模态输入吗？"

    ruijing-gpt-2.0支持：
    - 文本输入
    - 图像输入
    - 文本+图像混合输入

??? question "支持哪些语言？"

    主要支持：
    - 中文
    - 英文
    - 日文
    - 韩文
    - 以及其他50+种语言

??? question "如何控制输出格式？"

    在提示词中明确指定：
    ```python
    messages = [{
        "role": "user",
        "content": "请以JSON格式返回结果，包含name和age字段"
    }]
    ```

---

## 错误排查

??? question "为什么返回空响应？"

    可能原因：
    1. 触发了内容过滤
    2. max_tokens设置过小
    3. 网络问题
    
    解决方法：
    - 检查输入内容
    - 增加max_tokens
    - 查看错误日志

??? question "为什么响应很慢？"

    可能原因：
    1. 请求的tokens数量过多
    2. 服务器负载高
    3. 网络延迟
    
    解决方法：
    - 减少输入长度
    - 使用流式响应
    - 选择更快的模型

??? question "如何调试API问题？"

    1. 启用调试模式：
    ```python
    client = Client(api_key="...", debug=True)
    ```
    
    2. 查看请求日志
    3. 检查响应状态码
    4. 查看错误信息

---

## 其他问题

??? question "有使用限制吗？"

    根据套餐不同：
    - 免费版：10,000 tokens/月，3次/分钟
    - 专业版：1,000,000 tokens/月，60次/分钟
    - 企业版：自定义配额

??? question "如何获取技术支持？"

    - 免费版：社区论坛
    - 专业版：邮件支持（工作日响应）
    - 企业版：7x24小时专属支持

??? question "有示例代码吗？"

    有！访问我们的GitHub仓库：
    https://github.com/ruijing-ai/examples

??? question "如何参与社区？"

    - 加入Discord：https://discord.gg/ruijing-ai
    - 访问论坛：https://forum.ruijing.ai
    - 关注GitHub：https://github.com/ruijing-ai

---

## 找不到答案？

如果以上内容没有解决您的问题：

<div class="grid cards" markdown>

-   :material-email:{ .lg .middle } __联系支持__

    ---

    发送邮件至 support@ruijing.ai

-   :material-forum:{ .lg .middle } __访问论坛__

    ---

    在社区论坛提问

    [:octicons-arrow-right-24: 访问论坛](https://forum.ruijing.ai)

-   :material-chat:{ .lg .middle } __在线客服__

    ---

    工作日9:00-18:00在线

-   :material-book:{ .lg .middle } __查看文档__

    ---

    阅读完整技术文档

    [:octicons-arrow-right-24: 技术文档](getting-started.md)

</div>

---

*本FAQ持续更新中，如有建议请联系我们。*
