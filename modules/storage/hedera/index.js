require('./components')
require('./index.scss')
require('storage-client/setup')
const { menu } = require('hedera/global')

const StorageObject = require('storage/StorageObject')

const ObjectFieldset = require('modeling-hedera/form/ObjectFieldset')
const FileField = require('./components/File/Field')

ObjectFieldset.typesFieldmapping.unshift([StorageObject, FileField])

menu.links.push({
  class: 'fa-solid fa-folder',
  label: 'storage',
  url: '/explorer/storage',
})