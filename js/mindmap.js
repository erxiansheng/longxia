/**
 * 思维导图引擎
 * 支持节点管理、拖拽移动、Canvas渲染、导出PNG
 */

class MindMapEngine {
    constructor(container, options = {}) {
        this.container = typeof container === 'string' 
            ? document.querySelector(container) 
            : container;
        
        if (!this.container) {
            console.error('MindMapEngine: 容器元素未找到');
            return;
        }
        
        this.options = {
            nodeWidth: 120,
            nodeHeight: 40,
            nodeRadius: 8,
            fontSize: 14,
            fontFamily: 'system-ui, -apple-system, sans-serif',
            lineWidth: 2,
            lineColor: '#94a3b8',
            nodeBgColor: '#ffffff',
            nodeBorderColor: '#e2e8f0',
            nodeTextColor: '#1e293b',
            nodeSelectedColor: '#3b82f6',
            nodeHoverColor: '#f1f5f9',
            padding: 20,
            minZoom: 0.3,
            maxZoom: 2,
            ...options
        };
        
        // 数据结构
        this.rootNode = null;
        this.nodes = new Map();
        this.nodeIdCounter = 0;
        
        // 交互状态
        this.selectedNode = null;
        this.hoveredNode = null;
        this.draggingNode = null;
        this.dragOffset = { x: 0, y: 0 };
        this.isPanning = false;
        this.panStart = { x: 0, y: 0 };
        
        // 视图状态
        this.viewOffset = { x: 0, y: 0 };
        this.zoom = 1;
        
        // Canvas
        this.canvas = null;
        this.ctx = null;
        this.dpr = window.devicePixelRatio || 1;
        
        this.init();
    }

    /**
     * 初始化
     */
    init() {
        this.createCanvas();
        this.bindEvents();
        this.createRootNode();
        this.render();
    }

    /**
     * 创建Canvas
     */
    createCanvas() {
        this.canvas = document.createElement('canvas');
        this.canvas.style.cssText = `
            width: 100%;
            height: 100%;
            cursor: grab;
        `;
        this.container.innerHTML = '';
        this.container.appendChild(this.canvas);
        
        this.ctx = this.canvas.getContext('2d');
        this.resizeCanvas();
        
        window.addEventListener('resize', () => this.resizeCanvas());
    }

    /**
     * 调整Canvas大小
     */
    resizeCanvas() {
        const rect = this.container.getBoundingClientRect();
        this.canvas.width = rect.width * this.dpr;
        this.canvas.height = rect.height * this.dpr;
        this.ctx.scale(this.dpr, this.dpr);
        this.render();
    }

    /**
     * 绑定事件
     */
    bindEvents() {
        // 鼠标事件
        this.canvas.addEventListener('mousedown', (e) => this.onMouseDown(e));
        this.canvas.addEventListener('mousemove', (e) => this.onMouseMove(e));
        this.canvas.addEventListener('mouseup', (e) => this.onMouseUp(e));
        this.canvas.addEventListener('mouseleave', (e) => this.onMouseLeave(e));
        this.canvas.addEventListener('wheel', (e) => this.onWheel(e));
        this.canvas.addEventListener('dblclick', (e) => this.onDoubleClick(e));
        
        // 触摸事件
        this.canvas.addEventListener('touchstart', (e) => this.onTouchStart(e));
        this.canvas.addEventListener('touchmove', (e) => this.onTouchMove(e));
        this.canvas.addEventListener('touchend', (e) => this.onTouchEnd(e));
        
        // 键盘事件
        document.addEventListener('keydown', (e) => this.onKeyDown(e));
    }

    /**
     * 创建根节点
     */
    createRootNode() {
        this.rootNode = this.createNode('中心主题', null);
        this.rootNode.x = this.container.clientWidth / 2;
        this.rootNode.y = this.container.clientHeight / 2;
        this.rootNode.isRoot = true;
    }

    /**
     * 创建节点
     */
    createNode(text, parentId, direction = 'right') {
        const id = `node_${++this.nodeIdCounter}`;
        const node = {
            id,
            text,
            parentId,
            children: [],
            x: 0,
            y: 0,
            width: this.options.nodeWidth,
            height: this.options.nodeHeight,
            direction, // 'left', 'right', 'center'
            collapsed: false,
            isRoot: false,
            color: null
        };
        
        this.nodes.set(id, node);
        
        if (parentId) {
            const parent = this.nodes.get(parentId);
            if (parent) {
                parent.children.push(id);
                this.layoutChild(node, parent);
            }
        }
        
        return node;
    }

    /**
     * 布局子节点
     */
    layoutChild(child, parent) {
        const horizontalGap = 60;
        const verticalGap = 20;
        
        if (parent.isRoot) {
            const leftCount = this.getLeftChildren(parent).length;
            const rightCount = this.getRightChildren(parent).length;
            child.direction = leftCount <= rightCount ? 'left' : 'right';
        } else {
            child.direction = parent.direction;
        }
        
        child.x = parent.x + (child.direction === 'left' ? -horizontalGap - child.width : horizontalGap + parent.width);
        
        const siblings = parent.children.map(id => this.nodes.get(id)).filter(n => n && n.direction === child.direction);
        const index = siblings.indexOf(child);
        const totalHeight = siblings.length * (child.height + verticalGap) - verticalGap;
        const startY = parent.y - totalHeight / 2;
        child.y = startY + index * (child.height + verticalGap);
    }

    getLeftChildren(node) {
        return node.children.map(id => this.nodes.get(id)).filter(n => n && n.direction === 'left');
    }

    getRightChildren(node) {
        return node.children.map(id => this.nodes.get(id)).filter(n => n && n.direction === 'right');
    }

    /**
     * 添加节点
     */
    addNode(parentId, text = '新节点') {
        if (!parentId) {
            parentId = this.rootNode.id;
        }
        
        const node = this.createNode(text, parentId);
        this.autoLayout();
        this.render();
        
        return node;
    }

    /**
     * 删除节点
     */
    deleteNode(nodeId) {
        if (nodeId === this.rootNode.id) {
            console.warn('不能删除根节点');
            return false;
        }
        
        const node = this.nodes.get(nodeId);
        if (!node) return false;
        
        const deleteRecursive = (id) => {
            const n = this.nodes.get(id);
            if (n) {
                n.children.forEach(childId => deleteRecursive(childId));
                this.nodes.delete(id);
            }
        };
        
        if (node.parentId) {
            const parent = this.nodes.get(node.parentId);
            if (parent) {
                parent.children = parent.children.filter(id => id !== nodeId);
            }
        }
        
        deleteRecursive(nodeId);
        
        if (this.selectedNode && this.selectedNode.id === nodeId) {
            this.selectedNode = null;
        }
        
        this.autoLayout();
        this.render();
        
        return true;
    }

    /**
     * 更新节点文本
     */
    updateNodeText(nodeId, text) {
        const node = this.nodes.get(nodeId);
        if (node) {
            node.text = text;
            this.render();
            return true;
        }
        return false;
    }

    /**
     * 自动布局
     */
    autoLayout() {
        if (!this.rootNode) return;
        
        const centerX = this.container.clientWidth / 2;
        const centerY = this.container.clientHeight / 2;
        
        this.rootNode.x = centerX - this.rootNode.width / 2 + this.viewOffset.x;
        this.rootNode.y = centerY - this.rootNode.height / 2 + this.viewOffset.y;
        
        this.layoutSubtree(this.rootNode, 'left');
        this.layoutSubtree(this.rootNode, 'right');
    }

    /**
     * 布局子树
     */
    layoutSubtree(parent, direction) {
        const children = parent.children
            .map(id => this.nodes.get(id))
            .filter(n => n && n.direction === direction);
        
        if (children.length === 0) return;
        
        const horizontalGap = 80;
        const verticalGap = 15;
        
        const subtreeHeight = this.getSubtreeHeight(parent, direction);
        let startY = parent.y + parent.height / 2 - subtreeHeight / 2;
        
        children.forEach(child => {
            const childSubtreeHeight = this.getSubtreeHeight(child, direction);
            
            child.x = direction === 'left' 
                ? parent.x - horizontalGap - child.width 
                : parent.x + parent.width + horizontalGap;
            child.y = startY + childSubtreeHeight / 2 - child.height / 2;
            
            startY += childSubtreeHeight + verticalGap;
            
            if (!child.collapsed) {
                this.layoutSubtree(child, direction);
            }
        });
    }

    /**
     * 获取子树高度
     */
    getSubtreeHeight(node, direction) {
        const children = node.children
            .map(id => this.nodes.get(id))
            .filter(n => n && n.direction === direction);
        
        if (children.length === 0 || node.collapsed) {
            return node.height;
        }
        
        const verticalGap = 15;
        let totalHeight = 0;
        
        children.forEach((child, index) => {
            totalHeight += this.getSubtreeHeight(child, direction);
            if (index < children.length - 1) {
                totalHeight += verticalGap;
            }
        });
        
        return Math.max(node.height, totalHeight);
    }

    /**
     * 渲染
     */
    render() {
        if (!this.ctx || !this.rootNode) return;
        
        const ctx = this.ctx;
        const width = this.canvas.width / this.dpr;
        const height = this.canvas.height / this.dpr;
        
        ctx.clearRect(0, 0, width, height);
        
        ctx.save();
        ctx.translate(this.viewOffset.x, this.viewOffset.y);
        ctx.scale(this.zoom, this.zoom);
        
        this.renderConnections(ctx, this.rootNode);
        this.renderNodes(ctx, this.rootNode);
        
        ctx.restore();
    }

    /**
     * 渲染连接线
     */
    renderConnections(ctx, node) {
        if (node.collapsed) return;
        
        node.children.forEach(childId => {
            const child = this.nodes.get(childId);
            if (!child) return;
            
            ctx.beginPath();
            ctx.strokeStyle = this.options.lineColor;
            ctx.lineWidth = this.options.lineWidth;
            
            const startX = node.x + node.width / 2;
            const startY = node.y + node.height / 2;
            const endX = child.x + child.width / 2;
            const endY = child.y + child.height / 2;
            
            const controlOffset = Math.abs(endX - startX) * 0.5;
            
            ctx.moveTo(startX, startY);
            ctx.bezierCurveTo(
                startX + controlOffset * (child.direction === 'right' ? 1 : -1), startY,
                endX + controlOffset * (child.direction === 'right' ? -1 : 1), endY,
                endX, endY
            );
            ctx.stroke();
            
            this.renderConnections(ctx, child);
        });
    }

    /**
     * 渲染节点
     */
    renderNodes(ctx, node) {
        const isSelected = this.selectedNode && this.selectedNode.id === node.id;
        const isHovered = this.hoveredNode && this.hoveredNode.id === node.id;
        const isDragging = this.draggingNode && this.draggingNode.id === node.id;
        
        ctx.beginPath();
        this.roundRect(ctx, node.x, node.y, node.width, node.height, this.options.nodeRadius);
        
        if (isSelected) {
            ctx.fillStyle = this.options.nodeSelectedColor;
            ctx.strokeStyle = this.options.nodeSelectedColor;
            ctx.lineWidth = 3;
        } else if (isHovered || isDragging) {
            ctx.fillStyle = this.options.nodeHoverColor;
            ctx.strokeStyle = this.options.nodeSelectedColor;
            ctx.lineWidth = 2;
        } else {
            ctx.fillStyle = node.color || this.options.nodeBgColor;
            ctx.strokeStyle = this.options.nodeBorderColor;
            ctx.lineWidth = 1;
        }
        
        ctx.fill();
        ctx.stroke();
        
        ctx.fillStyle = isSelected ? '#ffffff' : this.options.nodeTextColor;
        ctx.font = `${this.options.fontSize}px ${this.options.fontFamily}`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(
            this.truncateText(ctx, node.text, node.width - 16),
            node.x + node.width / 2,
            node.y + node.height / 2
        );
        
        if (node.children.length > 0) {
            const indicatorSize = 16;
            const indicatorX = node.direction === 'left' 
                ? node.x - indicatorSize - 4 
                : node.x + node.width + 4;
            const indicatorY = node.y + node.height / 2 - indicatorSize / 2;
            
            ctx.beginPath();
            this.roundRect(ctx, indicatorX, indicatorY, indicatorSize, indicatorSize, 4);
            ctx.fillStyle = this.options.nodeBorderColor;
            ctx.fill();
            
            ctx.fillStyle = '#ffffff';
            ctx.font = 'bold 12px sans-serif';
            ctx.fillText(node.collapsed ? '+' : '-', indicatorX + indicatorSize / 2, indicatorY + indicatorSize / 2);
        }
        
        if (!node.collapsed) {
            node.children.forEach(childId => {
                const child = this.nodes.get(childId);
                if (child) {
                    this.renderNodes(ctx, child);
                }
            });
        }
    }

    roundRect(ctx, x, y, width, height, radius) {
        ctx.beginPath();
        ctx.moveTo(x + radius, y);
        ctx.lineTo(x + width - radius, y);
        ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
        ctx.lineTo(x + width, y + height - radius);
        ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
        ctx.lineTo(x + radius, y + height);
        ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
        ctx.lineTo(x, y + radius);
        ctx.quadraticCurveTo(x, y, x + radius, y);
        ctx.closePath();
    }

    truncateText(ctx, text, maxWidth) {
        if (ctx.measureText(text).width <= maxWidth) {
            return text;
        }
        
        let truncated = text;
        while (truncated.length > 0 && ctx.measureText(truncated + '...').width > maxWidth) {
            truncated = truncated.slice(0, -1);
        }
        return truncated + '...';
    }

    /**
     * 获取鼠标位置的节点
     */
    getNodeAtPosition(x, y) {
        const viewX = (x - this.viewOffset.x) / this.zoom;
        const viewY = (y - this.viewOffset.y) / this.zoom;
        
        const checkNode = (node) => {
            if (!node.collapsed) {
                for (let i = node.children.length - 1; i >= 0; i--) {
                    const child = this.nodes.get(node.children[i]);
                    if (child) {
                        const found = checkNode(child);
                        if (found) return found;
                    }
                }
            }
            
            if (viewX >= node.x && viewX <= node.x + node.width &&
                viewY >= node.y && viewY <= node.y + node.height) {
                return node;
            }
            
            return null;
        };
        
        return checkNode(this.rootNode);
    }

    // 鼠标事件处理
    onMouseDown(e) {
        const rect = this.canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const node = this.getNodeAtPosition(x, y);
        
        if (node) {
            this.selectedNode = node;
            this.draggingNode = node;
            this.dragOffset = {
                x: (x - this.viewOffset.x) / this.zoom - node.x,
                y: (y - this.viewOffset.y) / this.zoom - node.y
            };
            this.canvas.style.cursor = 'grabbing';
        } else {
            this.isPanning = true;
            this.panStart = { x: e.clientX - this.viewOffset.x, y: e.clientY - this.viewOffset.y };
            this.canvas.style.cursor = 'grabbing';
            this.selectedNode = null;
        }
        
        this.render();
    }

    onMouseMove(e) {
        const rect = this.canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        if (this.draggingNode) {
            this.draggingNode.x = (x - this.viewOffset.x) / this.zoom - this.dragOffset.x;
            this.draggingNode.y = (y - this.viewOffset.y) / this.zoom - this.dragOffset.y;
            this.render();
        } else if (this.isPanning) {
            this.viewOffset.x = e.clientX - this.panStart.x;
            this.viewOffset.y = e.clientY - this.panStart.y;
            this.autoLayout();
            this.render();
        } else {
            const node = this.getNodeAtPosition(x, y);
            if (node !== this.hoveredNode) {
                this.hoveredNode = node;
                this.canvas.style.cursor = node ? 'pointer' : 'grab';
                this.render();
            }
        }
    }

    onMouseUp(e) {
        this.draggingNode = null;
        this.isPanning = false;
        this.canvas.style.cursor = this.hoveredNode ? 'pointer' : 'grab';
    }

    onMouseLeave(e) {
        this.draggingNode = null;
        this.isPanning = false;
        this.hoveredNode = null;
        this.canvas.style.cursor = 'grab';
        this.render();
    }

    onWheel(e) {
        e.preventDefault();
        
        const rect = this.canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        
        const oldZoom = this.zoom;
        const delta = e.deltaY > 0 ? 0.9 : 1.1;
        this.zoom = Math.max(this.options.minZoom, Math.min(this.options.maxZoom, this.zoom * delta));
        
        const zoomRatio = this.zoom / oldZoom;
        this.viewOffset.x = mouseX - (mouseX - this.viewOffset.x) * zoomRatio;
        this.viewOffset.y = mouseY - (mouseY - this.viewOffset.y) * zoomRatio;
        
        this.autoLayout();
        this.render();
    }

    onDoubleClick(e) {
        const rect = this.canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const node = this.getNodeAtPosition(x, y);
        
        if (node) {
            this.editNode(node);
        } else {
            if (this.selectedNode) {
                this.addNode(this.selectedNode.id);
            } else {
                this.addNode(this.rootNode.id);
            }
        }
    }

    /**
     * 编辑节点
     */
    editNode(node) {
        const input = document.createElement('input');
        input.type = 'text';
        input.value = node.text;
        input.style.cssText = `
            position: absolute;
            left: ${node.x * this.zoom + this.viewOffset.x}px;
            top: ${node.y * this.zoom + this.viewOffset.y}px;
            width: ${node.width * this.zoom}px;
            height: ${node.height * this.zoom}px;
            font-size: ${this.options.fontSize * this.zoom}px;
            border: 2px solid ${this.options.nodeSelectedColor};
            border-radius: ${this.options.nodeRadius * this.zoom}px;
            padding: 0 8px;
            outline: none;
            z-index: 1000;
        `;
        
        this.container.appendChild(input);
        input.focus();
        input.select();
        
        const finishEdit = () => {
            node.text = input.value || '新节点';
            this.render();
            input.remove();
        };
        
        input.addEventListener('blur', finishEdit);
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') finishEdit();
            else if (e.key === 'Escape') input.remove();
        });
    }

    /**
     * 键盘事件
     */
    onKeyDown(e) {
        if (!this.selectedNode) return;
        
        switch (e.key) {
            case 'Tab':
                e.preventDefault();
                this.addNode(this.selectedNode.id);
                break;
            case 'Delete':
            case 'Backspace':
                if (!this.selectedNode.isRoot) {
                    this.deleteNode(this.selectedNode.id);
                }
                break;
            case 'Enter':
                if (this.selectedNode.parentId) {
                    this.addNode(this.selectedNode.parentId);
                }
                break;
            case ' ':
                e.preventDefault();
                this.selectedNode.collapsed = !this.selectedNode.collapsed;
                this.autoLayout();
                this.render();
                break;
        }
    }

    // 触摸事件
    onTouchStart(e) {
        if (e.touches.length === 1) {
            const touch = e.touches[0];
            this.onMouseDown({ clientX: touch.clientX, clientY: touch.clientY });
        }
    }

    onTouchMove(e) {
        if (e.touches.length === 1) {
            const touch = e.touches[0];
            this.onMouseMove({ clientX: touch.clientX, clientY: touch.clientY });
        }
    }

    onTouchEnd(e) {
        this.onMouseUp(e);
    }

    /**
     * 导出PNG
     */
    exportPNG(filename = 'mindmap.png') {
        // 创建临时Canvas用于导出
        const tempCanvas = document.createElement('canvas');
        const tempCtx = tempCanvas.getContext('2d');
        
        // 计算边界
        const bounds = this.getBounds();
        const padding = 50;
        
        tempCanvas.width = (bounds.maxX - bounds.minX + padding * 2) * this.dpr;
        tempCanvas.height = (bounds.maxY - bounds.minY + padding * 2) * this.dpr;
        
        tempCtx.scale(this.dpr, this.dpr);
        tempCtx.fillStyle = '#ffffff';
        tempCtx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);
        
        // 保存当前状态
        const savedOffset = { ...this.viewOffset };
        const savedZoom = this.zoom;
        
        // 调整偏移以适应导出
        this.viewOffset.x = -bounds.minX + padding;
        this.viewOffset.y = -bounds.minY + padding;
        this.zoom = 1;
        
        // 渲染到临时Canvas
        const savedCtx = this.ctx;
        this.ctx = tempCtx;
        this.render();
        this.ctx = savedCtx;
        
        // 恢复状态
        this.viewOffset = savedOffset;
        this.zoom = savedZoom;
        this.render();
        
        // 导出
        const link = document.createElement('a');
        link.download = filename;
        link.href = tempCanvas.toDataURL('image/png');
        link.click();
    }

    /**
     * 获取边界
     */
    getBounds() {
        let minX = Infinity, minY = Infinity;
        let maxX = -Infinity, maxY = -Infinity;
        
        this.nodes.forEach(node => {
            minX = Math.min(minX, node.x);
            minY = Math.min(minY, node.y);
            maxX = Math.max(maxX, node.x + node.width);
            maxY = Math.max(maxY, node.y + node.height);
        });
        
        return { minX, minY, maxX, maxY };
    }

    /**
     * 导入数据
     */
    importData(data) {
        this.nodes.clear();
        this.nodeIdCounter = 0;
        
        const loadNode = (nodeData, parentId = null) => {
            const node = this.createNode(nodeData.text, parentId, nodeData.direction);
            node.id = nodeData.id || node.id;
            node.x = nodeData.x || 0;
            node.y = nodeData.y || 0;
            node.collapsed = nodeData.collapsed || false;
            node.color = nodeData.color || null;
            
            if (nodeData.children && nodeData.children.length > 0) {
                nodeData.children.forEach(childData => {
                    loadNode(childData, node.id);
                });
            }
            
            return node;
        };
        
        if (data.root) {
            this.rootNode = loadNode(data.root);
            this.rootNode.isRoot = true;
        }
        
        this.autoLayout();
        this.render();
    }

    /**
     * 导出数据
     */
    exportData() {
        const saveNode = (node) => {
            return {
                id: node.id,
                text: node.text,
                x: node.x,
                y: node.y,
                direction: node.direction,
                collapsed: node.collapsed,
                color: node.color,
                children: node.children.map(childId => {
                    const child = this.nodes.get(childId);
                    return child ? saveNode(child) : null;
                }).filter(Boolean)
            };
        };
        
        return {
            root: this.rootNode ? saveNode(this.rootNode) : null
        };
    }

    /**
     * 清空
     */
    clear() {
        this.nodes.clear();
        this.nodeIdCounter = 0;
        this.createRootNode();
        this.selectedNode = null;
        this.render();
    }

    /**
     * 缩放控制
     */
    zoomIn() {
        this.zoom = Math.min(this.options.maxZoom, this.zoom * 1.2);
        this.autoLayout();
        this.render();
    }

    zoomOut() {
        this.zoom = Math.max(this.options.minZoom, this.zoom / 1.2);
        this.autoLayout();
        this.render();
    }

    resetView() {
        this.zoom = 1;
        this.viewOffset = { x: 0, y: 0 };
        this.autoLayout();
        this.render();
    }
}

// 导出
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MindMapEngine;
}
