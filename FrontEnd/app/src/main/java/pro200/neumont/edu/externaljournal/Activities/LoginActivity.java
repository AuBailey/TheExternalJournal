package pro200.neumont.edu.externaljournal.Activities;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;
import pro200.neumont.edu.externaljournal.Helper.DataGetter;
import pro200.neumont.edu.externaljournal.Helper.LoginValidationObj;
import pro200.neumont.edu.externaljournal.R;

import java.io.IOException;

public class LoginActivity extends AppCompatActivity {
    private Button mLoginButton;
    private Button mCreateProfileButton;
    private EditText mUsernameEditText;
    private EditText mPasswordEditText;
    private LoginValidationObj validationObj;

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


            doLogin(mUsernameEditText.getText().toString().trim(), mPasswordEditText.getText().toString().trim());
//            String message = validationObj.isSuccess() ? validationObj.getMessage() : "Failed";

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
                LoginValidationObj loginObj = DataGetter.LoginValidation(
                        mUsernameEditText.getText().toString().trim(),
                        mPasswordEditText.getText().toString().trim());
//                LoginValidationObj loginObj = DataGetter.LoginValidation(
//                        "test@gmail.com", "test");
//                System.out.println(loginObj.getMessage() + " - " + loginObj.isSuccess());

                Toast.makeText(this, loginObj.getMessage(), Toast.LENGTH_SHORT).show();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }));

        thread.start();
    }
}
