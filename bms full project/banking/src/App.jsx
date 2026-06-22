import { Route, Routes } from "react-router-dom";

import Auth from "./pages/Auth";
import AdminDashboard from "./pages/AdminDashboard";
import ExecutiveDashboard from "./pages/ExecutiveDashboard";
import CustomerDashboard from "./pages/CustomerDashboard";
import PageNotFound from "./pages/PageNotFound";
import ExecutiveManagement from "./pages/ExecutiveManagement";
import OnboardExecutive from "./components/admin/OnboardExecutive";
import UpdateExecutive from "./components/admin/UpdateExecutive";
import Home from "./pages/Home";
import CustomerLoanResubmit from "./pages/CustomerLoanResubmit";
import AdminBranchDashboard from "./pages/AdminBranchDashboard";
import AdminAddBranch from "./pages/AdminAddBranch";
import AdminUpdateBranch from "./pages/AdminUpdateBranch";
import AdminBranchDetails from "./pages/AdminBranchDetails";
import AdminLoanType from "./pages/AdminLoanType";
import ClosureRequestManagement from "./pages/ClosureRequestManagement";
import ReviewClosureRequest from "./pages/ReviewClosureRequest";
import CustomerClosureRequest from "./pages/CustomerClosureRequest";
import RequestClosureForm from "./components/customer/RequestClosureForm";
import CustomerBeneficiaries from "./pages/CustomerBeneficiaries";
import ForgotPassword from "./pages/ForgotPassword";
import ChangePassword from "./pages/ChangePassword";
import AdminAccountOpeningRequests from "./pages/AdminAccountOpeningRequests";

import AdminReviewAccountOpeningRequest from "./pages/AdminReviewAccountOpeningRequest";
import AdminLoanApplications from "./pages/AdminLoanApplications";

import AdminReviewLoanApplication from "./pages/AdminReviewLoanApplication";
import AdminLoanRepayments from "./pages/AdminLoanRepayments";
import AdminLoanMonitoring from "./pages/AdminLoanMonitoring";
import AdminOverdueLoans from "./pages/AdminOverdueLoans";
import AdminAccountTypes from "./pages/AdminAccountTypes";
import AdminAccountsDashboard from "./pages/AdminAccountsDashboard";
import AdminAccountSearch from "./pages/AdminAccountSearch";
import AdminAllAccounts from "./pages/AdminAllAccounts";
import AdminCustomers from "./pages/AdminCustomers";
import AdminCustomerDetails from "./pages/AdminCustomerDetails";
import AdminLoanDashboard from "./pages/AdminLoanDashboard";
import AdminLoanDetails from "./pages/AdminLoanDetails";
import AdminTransactionMonitoring from "./pages/AdminTransactionMonitoring";
import ExecutiveJointAccountRequests from "./pages/ExecutiveJointAccountRequests";
import UpdateCustomer from "./pages/UpdateCustomer";
import AdminJointAccountApprovals from "./pages/AdminJointAccountApprovals";
import ExecutiveProfile from "./pages/ExecutiveProfile";
import ExecutiveClosureRequest from "./pages/ExecutiveClosureRequest";
import ExecutiveReviewClosureRequest from "./components/executive/ExecutiveReviewClosureRequest";
import ExecutiveAccountOpeningRequests from "./pages/ExecutiveAccountOpeningRequests";
import ExecutiveReviewAccountOpeningRequest from "./pages/ExecutiveReviewAccountOpeningRequest";
import ExecutiveLoanApplications from "./pages/ExecutiveLoanApplications";
import ExecutiveReviewLoanApplication from "./pages/ExecutiveReviewLoanApplication";
import ExecutiveLoanRepayments from "./pages/ExecutiveLoanRepayments";
import ExecutiveLoanMonitoring from "./pages/ExecutiveLoanMonitoring";
import ExecutiveOverdueLoans from "./pages/ExecutiveOverdueLoans";
import ExecutiveMyBranch from "./pages/ExecutiveMyBranch";
import ExecutiveBranches from "./pages/ExecutiveBranches";
import ExecutiveCustomers from "./pages/ExecutiveCustomers";
import ExecutiveCustomerDetails from "./pages/ExecutiveCustomerDetails";
import AddCustomer from "./components/executive/AddCustomer";
import ExecutiveAccountsDashboard from "./pages/ExecutiveAccountsDashboard";
import ExecutiveAccountSearch from "./pages/ExecutiveAccountSearch";
import ExecutiveBranchAccounts from "./pages/ExecutiveBranchAccounts";
import ExecutiveCustomerAccounts from "./pages/ExecutiveCustomerAccounts";
import ExecutiveLoanDashboard from "./pages/ExecutiveLoanDashboard";
import ExecutiveTransactionMonitoring from "./pages/ExecutiveTransactionMonitoring";
import ExecutiveDetails from "./pages/ExecutiveDetails";

import CustomerAccountManagement from "./pages/CustomerAccountManagement";
import AccountOpeningForm from "./components/customer/AccountOpeningForm";
import CustomerLoanManagement from "./pages/CustomerLoanManagement";
import ApplyLoan from "./pages/ApplyLoan";
import CustomerLoanRepayment from "./pages/CustomerLoanRepayment";
import CustomerTransactions from "./pages/CustomerTransactions";
import AdminCreateLoanType from "./pages/AdminCreateLoanType";
import AdminEditLoanType from "./pages/AdminEditLoanType";
import CustomerProfile from "./pages/CustomerProfile";
import CustomerBranches from "./pages/CustomerBranches";
import CustomerJointAccountRequest from "./pages/CustomerJointAccountRequest";
const App = () => {  // This is a react component

    return ( // Every react component, must return a JSX : HTML + CSS + Javascript 
        <div>
            <Routes>
                <Route path="/customer/profile" element={<CustomerProfile />} />
                <Route path="/" element={<Home />} />
                <Route path="/change-password" element={<ChangePassword />} />
                <Route path="/admin/loan-types" element={<AdminLoanType />} />
                <Route path="/admin/loan-types/create" element={<AdminCreateLoanType />} />
                <Route path="/" element={<Home />}></Route>
                <Route path="/login" element={<Auth />}></Route>
                <Route path="*" element={<PageNotFound />}></Route>
                <Route path="/admin" element={<AdminDashboard />}></Route>
                <Route path="/executive" element={<ExecutiveDashboard />}></Route>
                <Route path="/admin/account-opening-requests" element={<AdminAccountOpeningRequests />} />
                <Route path="/executive/customer/add" element={<AddCustomer />} />
                <Route path="/admin/overdue-loans" element={<AdminOverdueLoans />} />
                <Route path="/admin/branches" element={<AdminBranchDashboard />} />
                <Route path="/admin/branch/add" element={<AdminAddBranch />} />
                <Route path="/admin/branch/update/:branchId" element={<AdminUpdateBranch />} />
                <Route path="/admin/branch/:branchId" element={<AdminBranchDetails />} />
                <Route path="/admin/account-types" element={<AdminAccountTypes />} />
                <Route path="/admin/accounts" element={<AdminAccountsDashboard />} />
                <Route path="/admin/account-search" element={<AdminAccountSearch />} />
                <Route path="/admin/all-accounts" element={<AdminAllAccounts />} />
                <Route path="/admin/customers" element={<AdminCustomers />} />
                <Route path="/admin/customer/:customerId" element={<AdminCustomerDetails />} />
                <Route
    path="/customer/loan-resubmit/:id"
    element={<CustomerLoanResubmit />}
/>
                <Route
                    path="/admin/loans"
                    element={
                        <AdminLoanDashboard />
                    }
                />
                <Route
                    path="/forgot-password"
                    element={<ForgotPassword />}
                />
                <Route
                    path="/admin/loan/:loanId"
                    element={<AdminLoanDetails />}
                />
                <Route
                    path="/admin/transaction-monitoring"
                    element={
                        <AdminTransactionMonitoring />
                    }
                />
                <Route
                    path="/executive/joint-account-requests"
                    element={<ExecutiveJointAccountRequests />}
                />

                <Route
                    path="/admin/joint-account-approvals"
                    element={<AdminJointAccountApprovals />}
                />

                <Route
                    path="/executive/accounts"
                    element={
                        <ExecutiveAccountsDashboard />
                    }
                />
                <Route
                    path="/admin/executive/view/:id"
                    element={<ExecutiveDetails />}
                />
                <Route
                    path="/executive/account-search"
                    element={
                        <ExecutiveAccountSearch />
                    }
                />
                <Route
                    path="/executive/branch-accounts"
                    element={
                        <ExecutiveBranchAccounts />
                    }
                />
                <Route
                    path="/executive/customer-accounts"
                    element={
                        <ExecutiveCustomerAccounts />
                    }
                />
                <Route
                    path="/executive/profile"
                    element={<ExecutiveProfile />}
                />
                <Route
                    path="/admin/loan-types/:id/edit"
                    element={<AdminEditLoanType />}
                />

                <Route
                    path="/admin/account-opening-review/:requestId"
                    element={<AdminReviewAccountOpeningRequest />}
                />

                <Route
                    path="/admin/loan-repayments"
                    element={<AdminLoanRepayments />}
                />
                <Route
                    path="/admin/loan-monitoring/:loanId"
                    element={<AdminLoanMonitoring />}
                />

                <Route path="/admin/executives" element={<ExecutiveManagement />} />
                <Route path="/admin/closureRequests" element={<ClosureRequestManagement />} />
                <Route path="/admin/executive/add" element={<OnboardExecutive />} />
                <Route path="/admin/executive/update/:id" element={<UpdateExecutive />} />
                <Route path="/admin/closure-review/:closureId" element={<ReviewClosureRequest />} />
                <Route
                    path="/admin/loan-applications"
                    element={<AdminLoanApplications />}
                />

                <Route
                    path="/admin/loan-applications/:applicationId/review"
                    element={<AdminReviewLoanApplication />}
                />

                <Route path="/customer/closure-request/add" element={<RequestClosureForm />} />
                <Route path="/executive/closure-requests" element={<ExecutiveClosureRequest />} />
                <Route path="/executive/closure-request/review/:requestId" element={<ExecutiveReviewClosureRequest />} />
                <Route path="/executive/account-opening-requests" element={<ExecutiveAccountOpeningRequests />} />
                <Route path="/executive/account-opening-review/:requestId" element={<ExecutiveReviewAccountOpeningRequest />} />
                <Route
                    path="/executive/loan-applications"
                    element={<ExecutiveLoanApplications />}
                />
                <Route
                    path="/executive/loan-applications/:applicationId/review"
                    element={<ExecutiveReviewLoanApplication />}
                />
                <Route
                    path="/executive/loan-repayments"
                    element={<ExecutiveLoanRepayments />}
                />

                <Route
                    path="/executive/loan-monitoring/:loanId"
                    element={<ExecutiveLoanMonitoring />}
                />
                <Route
                    path="/executive/overdue-loans"
                    element={<ExecutiveOverdueLoans />}
                />
                <Route
                    path="/executive/my-branch"
                    element={<ExecutiveMyBranch />}
                />
                <Route
                    path="/executive/branches"
                    element={<ExecutiveBranches />}
                />
                <Route
                    path="/executive/customers"
                    element={
                        <ExecutiveCustomers />
                    }
                />
                <Route
                    path="/executive/customer/:customerId"
                    element={
                        <ExecutiveCustomerDetails />
                    }
                />
                <Route
                    path="/executive/transaction-monitoring"
                    element={
                        <ExecutiveTransactionMonitoring />
                    }
                />



                <Route
                    path="/executive/addCustomer"
                    element={
                        <AddCustomer />
                    }
                />
                <Route
                    path="/executive/loans"
                    element={
                        <ExecutiveLoanDashboard />
                    }
                />


                <Route path="/customer" element={<CustomerDashboard />}></Route>
                <Route path="/customer/closure-requests" element={<CustomerClosureRequest />} />
                <Route path="/customer/accounts" element={<CustomerAccountManagement />} />
                <Route path="/customer/account-opening/apply" element={<AccountOpeningForm />} />

                <Route
                    path="/customer/loans"
                    element={<CustomerLoanManagement />}
                />
                <Route
                    path="/customer/loan/apply"
                    element={<ApplyLoan />}
                />
                <Route
                    path="/customer/loan-repayment"
                    element={<CustomerLoanRepayment />}
                />
                <Route
                    path="/customer/transactions"
                    element={<CustomerTransactions />}
                />
                <Route
                    path="/customer/beneficiaries"
                    element={<CustomerBeneficiaries />}
                />
                <Route
                    path="/customer/branches"
                    element={
                        <CustomerBranches />
                    }
                />
                <Route
                    path="/customer/joint-account-request"
                    element={
                        <CustomerJointAccountRequest />
                    }
                />
                <Route
    path="/executive/updateCustomer/:customerId"
    element={<UpdateCustomer />}
/>
            </Routes>


        </div>
    )

}

export default App; 