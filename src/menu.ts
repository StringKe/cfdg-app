import { app, BrowserWindow, Menu, MenuItemConstructorOptions } from 'electron'

interface DarwinMenuItemConstructorOptions extends MenuItemConstructorOptions {
  selector?: string
  submenu?: DarwinMenuItemConstructorOptions[] | Menu
}

export default class MenuBuilder {
  mainWindow: BrowserWindow

  constructor(mainWindow: BrowserWindow) {
    this.mainWindow = mainWindow
  }

  buildMenu(): Menu {
    if (
      process.env.NODE_ENV === 'development' ||
      process.env.DEBUG_PROD === 'true'
    ) {
      this.setupDevelopmentEnvironment()
    }

    const template =
      process.platform === 'darwin'
        ? this.buildDarwinTemplate()
        : this.buildDefaultTemplate()

    const menu = Menu.buildFromTemplate(template)
    Menu.setApplicationMenu(menu)

    return menu
  }

  setupDevelopmentEnvironment(): void {
    this.mainWindow.webContents.on('context-menu', (_, props) => {
      const { x, y } = props

      Menu.buildFromTemplate([
        {
          label: '检查元素',
          click: () => {
            this.mainWindow.webContents.inspectElement(x, y)
          },
        },
      ]).popup({ window: this.mainWindow })
    })
  }

  buildDarwinTemplate(): MenuItemConstructorOptions[] {
    const subMenuAbout: DarwinMenuItemConstructorOptions = {
      label: '重返帝国小助手',
      submenu: [
        {
          label: '关于 重返帝国小助手',
          selector: 'orderFrontStandardAboutPanel:',
        },
        { type: 'separator' },
        { label: '服务', submenu: [] },
        { type: 'separator' },
        {
          label: '隐藏重返帝国小助手',
          accelerator: 'Command+H',
          selector: 'hide:',
        },
        {
          label: '隐藏其他',
          accelerator: 'Command+Shift+H',
          selector: 'hideOtherApplications:',
        },
        { label: '显示所有', selector: 'unhideAllApplications:' },
        { type: 'separator' },
        {
          label: '退出',
          accelerator: 'Command+Q',
          click: () => {
            app.quit()
          },
        },
      ],
    }
    const subMenuEdit: DarwinMenuItemConstructorOptions = {
      label: '编辑',
      submenu: [
        { label: '撤销', accelerator: 'Command+Z', selector: 'undo:' },
        {
          label: '重做',
          accelerator: 'Shift+Command+Z',
          selector: 'redo:',
        },
        { type: 'separator' },
        { label: '剪切', accelerator: 'Command+X', selector: 'cut:' },
        {
          label: '复制',
          accelerator: 'Command+C ',
          selector: 'copy:',
        },
        { label: '粘贴', accelerator: 'Command+V', selector: 'paste:' },
        {
          label: '全选',
          accelerator: 'Command+A',
          selector: 'selectAll:',
        },
      ],
    }
    const subMenuViewDev: MenuItemConstructorOptions = {
      label: '视图',
      submenu: [
        {
          label: '重载',
          accelerator: 'Command+R',
          click: () => {
            this.mainWindow.webContents.reload()
          },
        },
        {
          label: '切换全屏',
          accelerator: 'Ctrl+Command+F',
          click: () => {
            this.mainWindow.setFullScreen(!this.mainWindow.isFullScreen())
          },
        },
        {
          label: '切换开发者工具',
          accelerator: 'Alt+Command+I',
          click: () => {
            this.mainWindow.webContents.toggleDevTools()
          },
        },
      ],
    }
    const subMenuViewProd: MenuItemConstructorOptions = {
      label: '视图',
      submenu: [
        {
          label: '切换全屏',
          accelerator: 'Ctrl+Command+F',
          click: () => {
            this.mainWindow.setFullScreen(!this.mainWindow.isFullScreen())
          },
        },
      ],
    }
    const subMenuWindow: DarwinMenuItemConstructorOptions = {
      label: '窗口',
      submenu: [
        {
          label: '最小化',
          accelerator: 'Command+M',
          selector: 'performMiniaturize:',
        },
        {
          label: '关闭',
          accelerator: 'Command+W',
          selector: 'performClose:',
        },
        { type: 'separator' },
        { label: '置顶窗口', selector: 'arrangeInFront:' },
      ],
    }
    const subMenuHelp: MenuItemConstructorOptions = {
      label: '帮助',
      submenu: [
        {
          label: '开发者：青木',
          click() {
            // not working
          },
        },
      ],
    }

    const subMenuView =
      process.env.NODE_ENV === 'development' ||
      process.env.DEBUG_PROD === 'true'
        ? subMenuViewDev
        : subMenuViewProd

    return [subMenuAbout, subMenuEdit, subMenuView, subMenuWindow, subMenuHelp]
  }

  buildDefaultTemplate() {
    return [
      {
        label: '文件',
        submenu: [
          {
            label: '打开',
            accelerator: 'Ctrl+O',
          },
          {
            label: '关闭',
            accelerator: 'Ctrl+W',
            click: () => {
              this.mainWindow.close()
            },
          },
        ],
      },
      {
        label: '视图',
        submenu:
          process.env.NODE_ENV === 'development' ||
          process.env.DEBUG_PROD === 'true'
            ? [
                {
                  label: '重载',
                  accelerator: 'Ctrl+R',
                  click: () => {
                    this.mainWindow.webContents.reload()
                  },
                },
                {
                  label: '切换全屏',
                  accelerator: 'F11',
                  click: () => {
                    this.mainWindow.setFullScreen(
                      !this.mainWindow.isFullScreen(),
                    )
                  },
                },
                {
                  label: '切换开发者工具',
                  accelerator: 'Alt+Ctrl+I',
                  click: () => {
                    this.mainWindow.webContents.toggleDevTools()
                  },
                },
              ]
            : [
                {
                  label: '切换全屏',
                  accelerator: 'F11',
                  click: () => {
                    this.mainWindow.setFullScreen(
                      !this.mainWindow.isFullScreen(),
                    )
                  },
                },
              ],
      },
      {
        label: '帮助',
        submenu: [
          {
            label: '开发者：青木',
            click() {
              // not working
            },
          },
        ],
      },
    ]
  }
}
