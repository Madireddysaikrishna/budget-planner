# TODO for Dashboard Enhancements

## Steps to Complete:

1. **Update Login.js - Change quote**: Replace the quote text from "Save money today, think of tomorrow" to "It's all about money".

2. **Update backend transactionsController.js - Add filtering**: Modify getTransactions to accept query params for month and year, filter SQL query with WHERE YEAR(transaction_date) = ? AND MONTH(transaction_date) = ?.

3. **Update routes/transactions.js - Pass query params**: Ensure the GET /api/transactions route passes req.query to controller.

4. **Update Dashboard.js - Add month/year selectors**: Add select dropdowns for month (1-12) and year (current and past), fetch filtered transactions on change, display filtered spendings summary/table.

5. **Update Dashboard.js - Add past month data**: Calculate and show summary for previous month (e.g., total expenses last month).

6. **Update Dashboard.js - Add navigation to add transactions**: Include a button/link to /transactions for adding new ones.

7. **Update App.js - Integrate Navbar**: Replace inline navbar with <Navbar /> component for consistent navigation, add logout.

8. **Update Navbar.js - Use local logo and add links**: Change logo to "/logo.png", add nav links to Dashboard (/), Transactions (/transactions), Users (/users), Categories (/categories).

9. **Update Navbar.css - Style links**: Ensure navigation links are styled properly.

10. **Verify changes**: Run backend (if not) and frontend, test filtering, navigation, add transaction flow, past month display.

After all steps, mark as done.
