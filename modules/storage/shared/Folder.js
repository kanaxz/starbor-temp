
const FileSystemObject = require('./FileSystemObject')

module.exports = class Folder extends FileSystemObject {

}
  .define({
    name: 'folder',
  })
  .controllers({
    create: {
      logic(context, states) {
        if (Object.values(states.access).some((v) => v === 'group')) {
          states.group.required = true
        }
        if (context.setup) {
          states.folder.required = false
        }
      }
    },
    update: {
      check(context, folder) {
        return context.user?.equals(folder.user)
      }
    }
  })
