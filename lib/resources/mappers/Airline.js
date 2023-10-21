'use strict';

const _modelMapper = (airline) => {
    return {
        id: airline.id,
        code: airline.code,
        name: airline.name,
    };
};

const listMapper = (users) => {
    return { users: users.map(_modelMapper) };
}

const modelMapper = (user) => {
    return { user: _modelMapper(user) };
};

module.exports = { _modelMapper, listMapper, modelMapper };
