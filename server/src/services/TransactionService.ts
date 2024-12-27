class TransactionService {
  async createTransaction(data: any) {
    try {
      console.log("Transaction created:");
    } catch (error) {
      console.error("Error creating transaction:", error);
    }
  }
}

export default new TransactionService();
