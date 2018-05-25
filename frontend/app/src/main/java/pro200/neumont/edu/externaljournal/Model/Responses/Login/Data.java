package pro200.neumont.edu.externaljournal.Model.Responses.Login;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

public class Data {

    @SerializedName("jwt")
    @Expose
    private String jwt;
    @SerializedName("user")
    @Expose
    private User user;

    public String getJwt() {
        return jwt;
    }

    public void setJwt(String jwt) {
        this.jwt = jwt;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    @Override
    public String toString()
    {
        return "Data{" +
                "jwt='" + jwt + '\'' +
                ", user=" + user +
                '}';
    }
}