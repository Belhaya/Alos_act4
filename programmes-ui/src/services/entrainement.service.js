import http from "../http-common";

class entrainementDataService {
  getAll() {
    return http.get("/p");
  }

  get(id) {
    return http.get(`/programmes_entrainments/${id}`);
  }

  create(data) {
    return http.post("/programmes_entrainments", data);
  }

  update(id, data) {
    return http.put(`/programmes_entrainments/${id}`, data);
  }

  delete(id) {
    return http.delete(`/programmes_entrainments/${id}`);
  }

  deleteAll() {
    return http.delete(`/programmes_entrainments`);
  }

  findBytype_entrainement(type_entrainement) {
    return http.get(`/programmes_entrainments?type_entrainement=${type_entrainement}`);
  }
}

export default new entrainementDataService();