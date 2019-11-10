class ApiUsage {
  onChangeHandlers = [];

  updateApiUsage = response => {
    const rateLimit = response.headers.get("RateLimit-Limit");
    const rateLimitRemaining = response.headers.get("RateLimit-Remaining");

    this.onChangeHandlers.forEach(cb => cb({ rateLimit, rateLimitRemaining }));

    return response;
  };

  onChange(callback) {
    this.onChangeHandlers.push(callback);
  }
}

export default new ApiUsage();
