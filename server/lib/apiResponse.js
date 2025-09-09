// utils/ApiResponse.js
class ApiResponse {
  constructor(success, message, data = null) {
    this.success = success;
    this.message = message;
    if (data) {
      this.data = data;
    }
  }
}

export default ApiResponse;
