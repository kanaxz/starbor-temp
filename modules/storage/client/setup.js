require('storage')
const { collectionsTypesMap } = require('processing-client')
const FileCollection = require('./FileCollection')
const FileSystemObject = require('storage/FileSystemObject')

collectionsTypesMap.unshift([FileSystemObject, FileCollection])