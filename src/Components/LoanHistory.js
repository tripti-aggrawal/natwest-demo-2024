function LoanHistory() {
    const loans = [
        {loan_id: "LN001", amt: "$5000", status: 'approved'},
        {loan_id: "LN002", amt: "$200", status: 'pending'},
    ]

    const statusChecker = (input) => {
        switch (input) {
            case 'approved':
                return "text-bg-success";
            case 'pending':
                return "text-bg-warning";
            case 'failed':
                return "text-bg-danger";
            default:
                return "text-bg-secondary"
        }
    }

    const fetchLoans = () => {
        if (loans.length > 0) {
            return (
                loans.map((element, index) => 
                    <tr>
                    <th scope="row">{index+1}</th>
                    <td>{element.loan_id}</td>
                    <td>{element.amt}</td>
                    <td><span class={"badge " + statusChecker(element.status)}>{element.status}</span></td>
                </tr>)
            );
        } else {
            return (
                <tr>
                    <td colSpan={4}>No records to display.</td>
                </tr>
            )
        }
    }
    return (
        <table class="table">
            <thead>
                <tr>
                <th scope="col">#</th>
                <th scope="col">Loan ID</th>
                <th scope="col">Amount</th>
                <th scope="col">Status</th>
                </tr>
            </thead>
            <tbody>
                { fetchLoans() }
            </tbody>
        </table>

    )
}

export default LoanHistory;