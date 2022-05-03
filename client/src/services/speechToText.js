import axios from "axios";

class Service {
  constructor() {
    this.service = axios.create({
      baseURL: "http://localhost:5005/api",
    });
  }

  createNewSearch = (formData) => {
    return this.service.post(`/convertspeech`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  };
}

const speechToTextService = new Service();

export { speechToTextService };
