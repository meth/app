import hotkeys from 'hotkeys-js'

import IPC from '../../common/constants/ipc'
import BACKEND_TASKS from '../../common/constants/ipcBackendTasks'
import IPC_UI_TASKS from '../../common/constants/ipcUiTasks'

const alert = msg => {
  /* eslint-disable no-console */
  console.error(msg)
  /* eslint-disable no-alert */
  window.alert(msg)
}

const openExternalUrl = url => {
  window.postMessage(
    {
      ipc: IPC.BACKEND_TASK,
      details: {
        task: BACKEND_TASKS.OPEN_EXTERNAL_URL,
        params: { url }
      }
    },
    '*'
  )
}

export default ({ globalEvents }) => {
  if (typeof window !== 'undefined') {
    hotkeys('command+shift+r,ctrl+shift+r', () => window.location.reload())
    hotkeys('command+alt+u,ctrl+alt+u', () =>
      globalEvents.emit(IPC_UI_TASKS.OPEN_ACTIVE_TAB_DEV_TOOLS)
    )
    hotkeys('command+r,ctrl+r', () =>
      globalEvents.emit(IPC_UI_TASKS.RELOAD_TAB)
    )
    hotkeys('command+t,ctrl+t', () =>
      globalEvents.emit(IPC_UI_TASKS.OPEN_NEW_TAB)
    )
    hotkeys('command+w,ctrl+w', () => globalEvents.emit(IPC_UI_TASKS.CLOSE_TAB))
    hotkeys('command+l,ctrl+l', () =>
      globalEvents.emit(IPC_UI_TASKS.EDIT_TAB_URL)
    )
    hotkeys('command+b,ctrl+b', () =>
      globalEvents.emit(IPC_UI_TASKS.OPEN_BOOKMARKS)
    )
    hotkeys('command+alt+right,ctrl+alt+right', () =>
      globalEvents.emit(IPC_UI_TASKS.GOTO_NEXT_TAB)
    )
    hotkeys('command+alt+left,ctrl+alt+left', () =>
      globalEvents.emit(IPC_UI_TASKS.GOTO_PREVIOUS_TAB)
    )
    hotkeys('esc', () => globalEvents.emit(IPC_UI_TASKS.KEY_ESCAPE))
    hotkeys('backspace', () => globalEvents.emit(IPC_UI_TASKS.KEY_BACKSPACE))
    hotkeys('0,1,2,3,4,5,6,7,8,9', () =>
      globalEvents.emit(
        IPC_UI_TASKS.KEY_NUMBER,
        (hotkeys.getPressedKeyCodes() || [ 48 ]).pop() - 48
      )
    )
  }

  return { alert, openExternalUrl }
}
