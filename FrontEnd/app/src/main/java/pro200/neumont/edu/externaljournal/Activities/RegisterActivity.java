package pro200.neumont.edu.externaljournal.Activities;

import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;
import pro200.neumont.edu.externaljournal.Helper.DataGetter;
import pro200.neumont.edu.externaljournal.Helper.LoginValidationObj;
import pro200.neumont.edu.externaljournal.Helper.RegisterValidationObj;
import pro200.neumont.edu.externaljournal.R;

import java.io.IOException;

public class RegisterActivity  extends AppCompatActivity
{
    private Button mRegisterButton;
    private Button mBackButton;
    private EditText mEmailEditText;
    private EditText mUsernameEditText;
    private EditText mPasswordEditText;
    private EditText mPasswordConfirmationEditText;

    @Override
    protected void onCreate(Bundle savedInstanceState)
    {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_register);

        mRegisterButton = findViewById(R.id.register_btn);
        mBackButton = findViewById(R.id.back_btn);

        mEmailEditText = findViewById(R.id.email_edit_text);
        mUsernameEditText = findViewById(R.id.username_edit_text);
        mPasswordEditText = findViewById(R.id.password_edit_text);
        mPasswordConfirmationEditText = findViewById(R.id.passwordConfirmation_edit_text);

        mRegisterButton.setOnClickListener((v) -> {
            if(!mPasswordEditText.getText().toString().equals(mPasswordConfirmationEditText.getText().toString()))
            {
                Toast.makeText(this, "Passwords must match.", Toast.LENGTH_SHORT).show();
            }else{
                doRegister(mEmailEditText.getText().toString().trim(),
                        mUsernameEditText.getText().toString().trim(),
                        mPasswordEditText.getText().toString().trim());
            }
        });

        mBackButton.setOnClickListener((v) -> {
            backToMainActivity();
        });
    }

    private void backToMainActivity()
    {
        Intent intent = new Intent(this, LoginActivity.class);
        startActivity(intent);
    }

    private void doRegister(String email, String username, String password) {
        Thread thread = new Thread(() -> runOnUiThread(() -> {
            try {
                RegisterValidationObj registerObj = DataGetter.RegisterValidation(email, username, password);
                Toast.makeText(this, registerObj.getMessage(), Toast.LENGTH_SHORT).show();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }));

        thread.start();
    }
}
