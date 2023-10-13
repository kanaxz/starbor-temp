require('./components')
const { collectionsTypesMap } = require('processing-client')
const FileSystemObject = require('storage/FileSystemObject')
const FileCollection = require('./FileCollection')

collectionsTypesMap.unshift([FileSystemObject, FileCollection])
