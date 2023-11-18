const Customer = require('../models/customer');

exports.createCustomer = async (req, res) => {
    try {
        const { first_name, last_name, street, address, city, state, email, phone } = req.body;

        if (!first_name || !last_name) {
            return res.status(400).json({
                success: false,
                message: "First Name or Last Name is missing",
            });
        }

        const newCustomer = new Customer({
            first_name,
            last_name,
            street,
            address,
            city,
            state,
            email,
            phone,
        });

        const savedCustomer = await newCustomer.save();

        return res.status(201).json({
            success: true,
            message: "Customer created successfully",
            customer: savedCustomer,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Failed to create customer",
        });
    }
};

exports.getCustomerList = async (req, res) => {
    try {
        const customers = await Customer.find();

        return res.status(200).json({
            success: true,
            message: "Customer list retrieved successfully",
            customers: customers,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Failed to get customer list",
        });
    }
};

exports.deleteCustomer = async (req, res) => {
    try {
        const { uuid } = req.body;

        const deletedCustomer = await Customer.findOneAndDelete({ uuid });

        if (deletedCustomer) {
            return res.status(200).json({
                success: true,
                message: "Customer deleted successfully",
            });
        } else {
            return res.status(400).json({
                success: false,
                message: "UUID not found",
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Failed to delete customer",
        });
    }
};

exports.getCustomer = async (req, res) => {
    try {
        const { uuid } = req.body;

        const getCustomer = await Customer.findOne({ uuid });

        if (getCustomer) {
            return res.status(200).json({
                success: true,
                message: "Customer retrieved successfully",
                customer: getCustomer,
            });
        } else {
            return res.status(400).json({
                success: false,
                message: "UUID not found",
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Failed to get customer",
        });
    }
};

exports.updateCustomer = async (req, res) => {
    try {
        const { uuid, first_name, last_name, street, address, city, state, email, phone } = req.body;

        const updatedCustomer = await Customer.findOneAndUpdate(
            { uuid },
            {
                first_name,
                last_name,
                street,
                address,
                city,
                state,
                email,
                phone,
            },
            { new: true }
        );

        if (updatedCustomer) {
            return res.status(200).json({
                success: true,
                message: "Customer updated successfully",
                customer: updatedCustomer,
            });
        } else {
            return res.status(400).json({
                success: false,
                message: "UUID not found",
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Failed to update customer",
        });
    }
};
