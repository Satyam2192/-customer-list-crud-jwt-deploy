const express = require("express");
const router = express.Router();

const { authenticateUser } = require('../Controllers/auth');
const { createCustomer, getCustomerList, deleteCustomer, updateCustomer, getCustomer } = require('../Controllers/customer');

router.post('/sunbase/portal/api/assignment_auth.jsp', authenticateUser);

router.post('/sunbase/portal/api/assignment.jsp', createCustomer);
router.get('/sunbase/portal/api/assignment.jsp', getCustomerList);
router.get(`/sunbase/portal/api/assignment.jsp/:uuid`, getCustomer);
router.delete('/sunbase/portal/api/assignment.jsp/:uuid', deleteCustomer);
router.put('/sunbase/portal/api/assignment.jsp/:uuid', updateCustomer);

module.exports = router;
