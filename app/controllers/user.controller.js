const ContactService = require("../services/user.service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");
const userService = require("../services/user.service");
const UserService = require("../services/user.service");

exports.create = (req, res) => {
    res.send({ 
        message: "create handler"
    });
};

exports.findAll = (req, res) => {
    res.send({
        message: "findAll handler"
    });
};

exports.findOne = (req, res) => {
    res.send({
        message: "findOne handler"
    });
};

exports.update = (req, res) => {
    res.send({
        message: "update handler"
    });
};

exports.delete = (req, res) => {
    res.send({
        message: "delete handler"
    });
};

exports.deleteAll = (req, res) => {
    res.send({
        message: "deleteAll handler"
    });
};


// login
exports.handleLogin = (req, res) => {
    res.send({
        message: "login handler"
    });
}

// create and save a new user
exports.create = async (req, res, next) => {
    if (!req.body.hotennv) {
        return next(new ApiError(400, "Name can not be empty"));
    }

    try {
        const userService = new UserService(MongoDB.client);
        const document = await userService.create(req.body);
        return res.send(document);
    } catch (error) {
        // console.log('Loi:' + error);
        return next(
            new ApiError(500, "An error occurred while creating the user")
        );
    }
};

// retrieve all contacts of a user form the database
exports.findAll = async (req, res, next) => {
    let documents = [];

    try {
        const userService = new UserService(MongoDB.client);
        let ten = req.body.ten;
        // const { name } = req.query;
        if (ten) {
            documents = await userService.findByName(ten);
        } else {
            documents = await userService.find({});
        }
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while retrieving contacts")
        );
    }

    return res.send(documents);
}

// find a single user with an id
exports.findOne = async (req, res, next) => {
    try {
        const userService = new UserService(MongoDB.client);
        const document = await userService.findById(req.params.id);
        if (!document) {
            return next(new ApiError(404, "user not found"));
        }
        return res.send(document);
    } catch (error) {
        return next(
            new ApiError(500, `Error retrieving user with id=${req.params.id}`)
        );
    }
};

// update a user by the id in the request
exports.update = async (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
        return next(new ApiError(400, "Data to update can not be empty"));
    }

    try {
        const userService = new UserService(MongoDB.client);
        const document = await userService.update(req.params.id, req.body);
        // console.log("document " + document);
        // if (!document) {
        //     return next(new ApiError(404, "user not found"));
        // }
        return res.send({message: "user was updated successfully"});
    } catch (error) {
        return next(
            new ApiError(500, `Error updating user with id=${req.params.id}`)
        );
    }
}
// delete a user with the specified id in the request
exports.delete = async (req, res, next) => {
    try {
        const userService = new UserService(MongoDB.client);
        const document = await userService.delete(req.params.id);
        if (!document) {
            return next(new ApiError(404, "user not found"));
        }
        return res.send({message: "user was deleted successfully"});
    } catch (error) {
        return next(
            new ApiError(500, `Could not delete user with id=${req.params.id}`)
        )
    };
};

// // find all favorite contacts of a user
// exports.findAllFavorite = async (req, res, next) => {
//     try {
//         const contactService = new ContactService(MongoDB.client);
//         const documents = await contactService.findFavorite();
//         return res.send(documents);
//     } catch (error) {
//         return next(
//             new ApiError(500, "An error occurred while retrieving favorite contacts")
//         );
//     }
// };

// delete all contacts of a user from the database
exports.deleteAll = async (req, res, next) => {
    try {
        const userService = new UserService(MongoDB.client);
        const deletedCount = await userService.deleteAll();
        return res.send({
            message: `${deletedCount} users were deleted successfully`,
        });
    } catch (error) {
        return next(new ApiError(500, "An error occurred while removing all contacts"));
    }
};

// mo rong login
exports.handleLogin = async (req, res, next) => {
    let documents = [];
    try {
        const userService = new UserService(MongoDB.client);
        let password = req.body.password;
        if (password) {
            documents = await userService.login(password);
            if (documents.length == 0) {
                return next(new ApiError(404, `Your password doesn't exist in our system, please try another email`));
            }
            return res.send(documents);
        } else {
            return next(new ApiError(404, `Email can not be empty`));
        }
    } catch (error) {
        return next(new ApiError(500, "An error occurred while logging"));
    }
}