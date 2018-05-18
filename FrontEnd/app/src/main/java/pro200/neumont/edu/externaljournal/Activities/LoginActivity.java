package pro200.neumont.edu.externaljournal.Activities;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;
import pro200.neumont.edu.externaljournal.Helper.LoginValidationObj;
import pro200.neumont.edu.externaljournal.Helper.RequestHelper;
import pro200.neumont.edu.externaljournal.R;

public class LoginActivity extends AppCompatActivity {
    private Button mLoginButton;
    private EditText mUsernameEditText;
    private EditText mPasswordEditText;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);

        mLoginButton = (Button) findViewById(R.id.login_btn);

        mUsernameEditText = (EditText) findViewById(R.id.username_edit_text);
        mPasswordEditText = (EditText) findViewById(R.id.password_edit_text);
        mLoginButton.setOnClickListener((v) -> {
            System.out.println("mUsernameEditText - " + mUsernameEditText.getText().toString());
            System.out.println("mPasswordEditText - " + mPasswordEditText.getText().toString());

            LoginValidationObj loginObj =
                    RequestHelper.doLogin(mUsernameEditText.getText().toString().trim(), mPasswordEditText.getText().toString().trim());

            String message = "";
            if(!loginObj.isSuccess())
                message = loginObj.getMessage();

            Toast.makeText(this, message, Toast.LENGTH_SHORT).show();
        });
    }
}
