'use strict';

const userModel = require('./userModel');

/**
 * Get a the current user
 * @param {*} req 
 * @param {*} res 
 */
exports.getLoggedInUser = function (req, res) {
    userModel.getUserById(req.user.id).then(function (user) {
        return res.json({
            'success': true,
            'data': {
                'user': user
            }
        });
    }).catch((error) => {
        return res.status(400).json({
            'success': false,
            'message': "Unable to retrieve user with id: " + req.user.id
        });
    })
};

/**
 * Get User By Id
 * @param {*} req 
 * @param {*} res 
 */
exports.getUserById = function (req, res) {
    if (!req.params.userId) {
        return res.status(400).json({
            'success': false,
            'message': 'Valid userId required.'
        });
    }

    userModel.getUserById(req.params.userId).then(function (user) {
        return res.json({
            'success': true,
            'data': {
                'user': user
            }
        });
    }).catch((error) => {
        return res.status(400).json({
            'success': false,
            'message': "Unable to retrieve user with id: " + req.params.userId
        });
    })
};

/**
 * Get All users
 * @param {*} req 
 * @param {*} res 
 */
exports.getAllUsers = function (req, res) {
    userModel.getAllUsers().then(function (users) {
        return res.json({
            'success': true,
            'data': {
                'users': users
            }
        });
    }).catch((error) => {
        return res.status(400).json({
            'success': false,
            'message': "Unable to retrieve all users"
        });
    })
};

/**
 * Update the current user's username
 * @param {*} req 
 * @param {*} res 
 */
exports.updateUser = function (req, res) {
    // useLocation is a boolean, so check if undefined, not falsy values
    if (!req.body.username && !(req.body.useLocation == 1 || req.body.useLocation == 0) ) {
        return res.status(400).json({
            'success': false,
            'message': 'Valid username or useLocation required.'
        });
    }

    let columns = [];
    let data = [];
    if (req.body.username) {
        columns.push('username');
        data.push(req.body.username);
    }
    if (req.body.useLocation != undefined) {
        columns.push('useLocation');
        data.push(req.body.useLocation);
    }

    userModel.updateUser(req.user.id, columns, data).then(function (changedRows) {
        return res.json({
            'success': true,
            'data': {
                'numberOfchangedRows': changedRows
            }
        });
    }).catch((error) => {
        return res.status(400).json({
            'success': false,
            'message': "Unable to update user with id: " + req.user.id
        });
    })
};

/**
 * Delete the current user
 * @param {*} req 
 * @param {*} res 
 */
exports.deleteLoggedInUser = function (req, res) {
    userModel.deleteUser(req.user.id).then(function (userId) {
        return res.json({
            'success': true,
            'data': {
                'deletedUserId': userId
            }
        });
    }).catch((error) => {
        return res.status(400).json({
            'success': false,
            'message': "Unable to delete user with id: " + req.user.id
        });
    })
};

/**
 * Gets the roles of the user
 * @param {*} req 
 * @param {*} res 
 */
exports.getUserRoles = function (req, res) {
    userModel.getUserRoles(req.user.id).then(function (userRoles) {
        return res.json({
            'success': true,
            'data': {
                'roles': userRoles
            }
        });
    }).catch((error) => {
        return res.status(400).json({
            'success': false,
            'message': "Unable to get the roles of user with id: " + req.user.id
        });
    })
}

/**
 * Give role to user 
 * @param {*} req 
 * @param {*} res 
 */
exports.giveRole = function (req, res) {
    if (!req.body.userId || !req.body.roleId) {
        return res.status(400).json({
            'success': false,
            'message': 'Valid userId and roleId required.'
        });
    }

    userModel.giveRole(req.body.userId, req.body.roleId).then(function (insertId) {
        return res.json({
            'success': true,
            'data': {
                'insertId': insertId
            }
        });
    }).catch((error) => {
        if (error.errno == 1062) {
            return res.status(400).json({
                'success': false,
                'message': "User with id: " + req.body.userId + " already has the role with id: " + req.body.roleId
            });
        } else {
            return res.status(400).json({
                'success': false,
                'message': "Unable to give user with id: " + req.body.userId + " the role with id: " + req.body.roleId
            });
        }
    })
}

/**
 * Remove role from user 
 * @param {*} req 
 * @param {*} res 
 */
exports.removeRole = function (req, res) {
    if (!req.body.userId || !req.body.roleId) {
        return res.status(400).json({
            'success': false,
            'message': 'Valid userId and roleId required.'
        });
    }

    userModel.removeRole(req.body.userId, req.body.roleId).then(function (deletedRowId) {
        return res.json({
            'success': true,
            'data': {
                'deletedRowId': deletedRowId
            }
        });
    }).catch((error) => {
        return res.status(400).json({
            'success': false,
            'message': "Unable to remove the role with id: " + req.body.roleId + " from user with id: " + req.body.userId
        });
    })
}