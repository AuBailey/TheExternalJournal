package pro200.neumont.edu.externaljournal.Helper;

import io.reactivex.Observable;
import pro200.neumont.edu.externaljournal.Model.Responses.Login.LoginResponse;
import retrofit2.http.Field;
import retrofit2.http.FormUrlEncoded;
import retrofit2.http.POST;

public interface Api
{
    @POST("api/auth/login/")
    @FormUrlEncoded
    Observable<LoginResponse> login(@Field("email") String email,
                                    @Field("password") String password);


//    @GET
//    Observable<RegisterResponse> register(@Body RegisterRequest request);
}
