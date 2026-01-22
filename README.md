# 锐境 AI 官方网站

基于 MkDocs Material 构建的现代化企业网站。

## 特性

- 🎨 现代化的设计风格
- 📱 完全响应式布局
- 🌓 支持深色/浅色主题切换
- 🔍 强大的搜索功能
- 📝 丰富的Markdown扩展
- 🚀 快速的页面加载
- 🎯 SEO优化

## 快速开始

### 方法一：使用启动脚本（推荐）

**Windows:**
```bash
start.bat
```

**Linux/Mac:**
```bash
chmod +x start.sh
./start.sh
```

### 方法二：手动命令

**安装依赖**

```bash
pip install -r requirements.txt
```

**本地预览**

```bash
mkdocs serve
```

访问 http://127.0.0.1:8000 查看网站

**构建网站**

```bash
mkdocs build
```

生成的静态文件将保存在 `site/` 目录中。

## 项目结构

```
ruijing.ai/
├── docs/                   # 文档源文件
│   ├── index.md           # 首页
│   ├── products/          # 产品服务
│   ├── docs/              # 技术文档
│   │   └── blog/          # 博客
│   ├── about/             # 关于我们
│   │   ├── index.md
│   │   └── team.md
│   ├── stylesheets/       # 自定义样式
│   │   └── extra.css
│   ├── javascripts/       # 自定义脚本
│   │   └── extra.js
│   └── assets/            # 静态资源
├── mkdocs.yml             # MkDocs配置文件
├── requirements.txt       # Python依赖
└── README.md             # 项目说明
```

## 配置说明

### 主题配置

网站使用 Material for MkDocs 主题，主要配置包括：

- **颜色方案**：深紫色主题，支持深色/浅色模式
- **导航**：顶部标签页导航 + 侧边栏
- **搜索**：支持中英文搜索
- **字体**：Noto Sans SC（正文）+ JetBrains Mono（代码）

### Markdown扩展

启用了丰富的Markdown扩展：

- 代码高亮和复制
- 提示框（admonition）
- 表格和列表
- 数学公式
- Emoji支持
- 标签页
- 流程图（Mermaid）

## 自定义样式

### CSS

自定义样式位于 `docs/stylesheets/extra.css`，包括：

- Hero区域样式
- 卡片网格布局
- 按钮动画效果
- 响应式设计
- 深色模式适配

### JavaScript

自定义脚本位于 `docs/javascripts/extra.js`，包括：

- 滚动动画
- 按钮交互效果
- 粒子效果
- 平滑滚动

## 部署

### GitHub Pages

```bash
mkdocs gh-deploy
```

### Netlify

1. 连接GitHub仓库
2. 构建命令：`mkdocs build`
3. 发布目录：`site`

### Vercel

1. 导入项目
2. 构建命令：`mkdocs build`
3. 输出目录：`site`

### 自定义服务器

```bash
# 构建静态文件
mkdocs build

# 将 site/ 目录部署到服务器
rsync -avz site/ user@server:/var/www/html/
```

## 开发指南

### 添加新页面

1. 在 `docs/` 目录下创建新的 `.md` 文件
2. 在 `mkdocs.yml` 的 `nav` 部分添加导航链接
3. 使用 `mkdocs serve` 预览效果

### 修改样式

1. 编辑 `docs/stylesheets/extra.css`
2. 保存后自动重新加载

### 添加功能

1. 编辑 `docs/javascripts/extra.js`
2. 添加新的交互功能

## 内容编写

### 使用图标

```markdown
:material-rocket: 这是一个图标
```

### 创建卡片网格

```markdown
<div class="grid cards" markdown>

-   :material-icon:{ .lg .middle } __标题__

    ---

    描述内容

    [:octicons-arrow-right-24: 链接](url)

</div>
```

### 添加提示框

```markdown
!!! tip "提示"
    这是一个提示框

!!! warning "警告"
    这是一个警告框

!!! info "信息"
    这是一个信息框
```

### 代码块

````markdown
```python
def hello():
    print("Hello, World!")
```
````

### 标签页

```markdown
=== "Python"

    ```python
    print("Hello")
    ```

=== "JavaScript"

    ```javascript
    console.log("Hello");
    ```
```

## 维护

### 更新依赖

```bash
pip install --upgrade -r requirements.txt
```

### 检查链接

```bash
mkdocs build --strict
```

## 技术栈

- [MkDocs](https://www.mkdocs.org/) - 静态站点生成器
- [Material for MkDocs](https://squidfunk.github.io/mkdocs-material/) - Material Design主题
- [PyMdown Extensions](https://facelessuser.github.io/pymdown-extensions/) - Markdown扩展
- [GLightbox](https://github.com/biati-digital/glightbox) - 图片灯箱

## 许可证

Copyright © 2026 锐境 AI. All rights reserved.

## 联系我们

- 网站：https://ruijing.ai
- 邮箱：contact@ruijing.ai
- GitHub：https://github.com/ruijing-ai

---

**注意**：这是一个演示项目，所有内容仅供参考。
