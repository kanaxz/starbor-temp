require('management/setup')
const { collectionsTypesMap } = require('modeling-client')
const UserCollection = require('./UserCollection')
const { User } = require('management')

collectionsTypesMap.unshift([User, UserCollection])