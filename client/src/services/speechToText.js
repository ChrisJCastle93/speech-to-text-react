import axios from "axios";

class Service {
  constructor() {
    this.service = axios.create({
      baseURL: `${process.env.REACT_APP_API_URL}`,
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
