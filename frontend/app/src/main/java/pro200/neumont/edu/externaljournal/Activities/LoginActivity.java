package pro200.neumont.edu.externaljournal.Activities;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;
import io.reactivex.Observer;
import io.reactivex.android.schedulers.AndroidSchedulers;
import io.reactivex.disposables.Disposable;
import io.reactivex.schedulers.Schedulers;
import pro200.neumont.edu.externaljournal.Helper.Api;
import pro200.neumont.edu.externaljournal.Helper.Helper;
import pro200.neumont.edu.externaljournal.Helper.HttpRequestHelper;
import pro200.neumont.edu.externaljournal.Model.Responses.Login.LoginResponse;
import pro200.neumont.edu.externaljournal.R;


public class LoginActivity extends AppCompatActivity {
    private Button mLoginButton;
    private Button mCreateProfileButton;
    private EditText mUsernameEditText;
    private EditText mPasswordEditText;
    private LoginResponse loginResponse;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);

        mLoginButton = (Button) findViewById(R.id.login_btn);
        mCreateProfileButton = (Button) findViewById(R.id.createProfile_btn);

        mUsernameEditText = (EditText) findViewById(R.id.username_edit_text);
        mPasswordEditText = (EditText) findViewById(R.id.password_edit_text);
        mLoginButton.setOnClickListener((v) -> {
            System.out.println("mUsernameEditText - " + mUsernameEditText.getText().toString());
            System.out.println("mPasswordEditText - " + mPasswordEditText.getText().toString());

            HttpRequestHelper.doLogin("https://nuproject.tech/",
                    mUsernameEditText.getText().toString(),
                    mPasswordEditText.getText().toString(),
                    this);

            System.out.println("End of onClicked");
        });

        mCreateProfileButton.setOnClickListener((v) -> {
            launchActivity();
        });

    }

//    private void doLogin(String baseUrl, String email, String password) {
//        Api api = Helper.getRetrofit(baseUrl).create(Api.class);
//        api.login(email, password)
//                .subscribeOn(Schedulers.io())
//                .observeOn(AndroidSchedulers.mainThread())
//                .subscribe(new Observer<LoginResponse>() {
//                    LoginResponse l;
//
//                    @Override
//                    public void onSubscribe(Disposable disposable) {
//                    }
//
//                    @Override
//                    public void onNext(LoginResponse response) {
//                        l = response;
//
//                        System.out.println(response.toString());
//                        System.out.println(response.isSuccess());
//                    }
//
//                    @Override
//                    public void onError(Throwable throwable) {
//
//                    }
//
//                    @Override
//                    public void onComplete() {
//                        try {
//                            showToast(LoginActivity.this, "" + l.isSuccess());
//                        } catch (InterruptedException e) {
//                            e.printStackTrace();
//                        }
//                        loginResponse = l;
//                        System.out.println("l - " + l.toString());
//                        System.out.println("loginResponse - " + loginResponse.toString());
//                    }
//                });
//    }

    private void launchActivity() {
        Intent intent = new Intent(this, RegisterActivity.class);
        startActivity(intent);
    }
//
//    private void showToast(Activity self, String msg) throws InterruptedException {
//        Toast.makeText(self, msg, Toast.LENGTH_SHORT).show();
//    }

}