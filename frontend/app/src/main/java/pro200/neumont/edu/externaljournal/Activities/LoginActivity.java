package pro200.neumont.edu.externaljournal.Activities;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import okhttp3.*;
import pro200.neumont.edu.externaljournal.Helper.DataGetter;
import pro200.neumont.edu.externaljournal.Helper.LoginValidationObj;
import pro200.neumont.edu.externaljournal.R;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

public class LoginActivity extends AppCompatActivity {
    private Button mLoginButton;
    private Button mCreateProfileButton;
    private EditText mUsernameEditText;
    private EditText mPasswordEditText;
    private Toast toast;
    private LoginValidationObj validationObj;
    private Request request;
    private RequestBody requestBody;
    private OkHttpClient client;
    private String responseMsg;


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

            String url = "https://nuproject.tech/api/auth/login";

            Map<String, String> headers = new HashMap<>();
            headers.put("Content-Type", "application/x-www-form-urlencoded");

//            Toast.makeText(this, "", Toast.LENGTH_SHORT).show();
        });
        mCreateProfileButton.setOnClickListener((v) -> {
            launchActivity();
        });
    }

    private void launchActivity()
    {
        Intent intent = new Intent(this, RegisterActivity.class);
        startActivity(intent);
    }

    private void doLogin(String username, String password) {
        Thread thread = new Thread(() -> runOnUiThread(() -> {
            try {
                showToast(responseMsg);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            System.out.println("BtnListenerFinished");
        });
    }

    private void doLogin(String username, String password) throws Exception {
//        Thread thread = new Thread(() -> {
//        try {
////                validationObj = DataGetter.LoginValidation(
////                        mUsernameEditText.getText().toString().trim(),
////                        mPasswordEditText.getText().toString().trim());
//            LoginValidationObj loginObj = DataGetter.LoginValidation(
//                    "test@gmail.com", "test");
//            System.out.println(loginObj.getMessage() + " - " + loginObj.isSuccess());
//
////                Toast.makeText(this, loginObj.getMessage(), Toast.LENGTH_SHORT).show();
//        } catch (IOException e) {
//            e.printStackTrace();
//        }
//        });

//        thread.start();
//        thread.join();

        String url = "https://nuproject.tech/api/auth/login";

        Map<String, String> headers = new HashMap<>();
        headers.put("Content-Type", "application/x-www-form-urlencoded");

        Map<String, String> body = new HashMap<>();
        body.put("email", username);
        body.put("password", password);

        client = new OkHttpClient();

        requestBody = HttpRequestHelper.processBodyFromMap(body).build();

        request = new Request.Builder()
                .url(url)
                .headers(HttpRequestHelper.processHeaderFromMap(headers).build())
                .post(requestBody).build();

        Thread thread = new Thread(() -> {
            runOnUiThread(() -> {
                Call call = client.newCall(request);
                call.enqueue(new Callback() {
                    public void onResponse(Call call, Response response)
                            throws IOException {
                        String responseMsg = "";
                        String responseFromServer = response.body().string();
                        System.out.println("Response - " + responseFromServer);

                        JsonObject jsonObj = new JsonParser().parse(responseFromServer).getAsJsonObject();
                        if (jsonObj.get("success").getAsBoolean()) {
                            responseMsg = "Success";
                            System.out.println("isSucceed - " + jsonObj.get("success").getAsBoolean());
                            System.out.println("jwt - " + jsonObj.get("data").getAsJsonObject().get("jwt").toString());
                        } else {
                            responseMsg = jsonObj.get("message").toString();
                            System.out.println("isSucceed - " + jsonObj.get("success").getAsBoolean());
                            System.out.println("message - " + jsonObj.get("message").toString());
                        }
                        //                    showToast(responseMsg);
//                        Toast.makeText(this, responseMsg, Toast.LENGTH_SHORT).show();

                    }

                    public void onFailure(Call call, IOException e) {
                    }
                });
            });
        });
    }

    private void showToast(String msg) throws InterruptedException {
        Toast.makeText(this, responseMsg, Toast.LENGTH_SHORT).show();
    }
}