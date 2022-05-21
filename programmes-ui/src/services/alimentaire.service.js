import http from "../http-common";

class alimentaireDataService {
  getAll() {
    return http.get("/p");
  }

  get(id) {
    return http.get(`/programmes_alimentaires/${id}`);
  }

  create(data) {
    return http.post("/programmes_alimentaires", data);
  }

  update(id, data) {
    return http.put(`/programmes_alimentaires/${id}`, data);
  }

  delete(id) {
    return http.delete(`/programmes_alimentaires/${id}`);
  }

  deleteAll() {
    return http.delete(`/programmes_alimentaires`);
  }

  findBytype_regime(type_regime) {
    return http.get(`/programmes_alimentaires?type_regime=${type_regime}`);
  }
}

export default new alimentaireDataService();