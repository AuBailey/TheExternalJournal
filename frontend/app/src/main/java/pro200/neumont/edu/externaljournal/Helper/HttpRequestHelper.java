package pro200.neumont.edu.externaljournal.Helper;


import android.app.Activity;
import android.content.Context;
import android.widget.Toast;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import io.reactivex.Observer;
import io.reactivex.android.schedulers.AndroidSchedulers;
import io.reactivex.disposables.Disposable;
import io.reactivex.schedulers.Schedulers;
import okhttp3.*;
import pro200.neumont.edu.externaljournal.Activities.LoginActivity;
import pro200.neumont.edu.externaljournal.Model.Responses.Login.LoginResponse;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.util.Map;

import static pro200.neumont.edu.externaljournal.Helper.Helper.showToast;

public class HttpRequestHelper {

    public static void doLogin(String baseUrl, String email, String password, Activity activity) {
        Api api = Helper.getRetrofit(baseUrl).create(Api.class);
        api.login(email, password)
                .subscribeOn(Schedulers.io())
                .observeOn(AndroidSchedulers.mainThread())
                .subscribe(new Observer<LoginResponse>() {
                    LoginResponse l;

                    @Override
                    public void onSubscribe(Disposable disposable) {
                    }

                    @Override
                    public void onNext(LoginResponse response) {
                        l = response;

                        System.out.println(response.toString());
                        System.out.println(response.isSuccess());
                    }

                    @Override
                    public void onError(Throwable throwable) {
                        showToast(activity, "Unexepected error occured");
                    }

                    @Override
                    public void onComplete() {
                        showToast(activity, l.isSuccess() ? "Success" : "Failed");
                        System.out.println("l - " + l.toString());
                    }
                });
    }
}