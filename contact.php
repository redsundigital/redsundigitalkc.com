<?php   
    // Message vars
    $msg = '';
    $msgClass = '';

    // Check for submit
    if(filter_has_var(INPUT_POST, 'submit')) {
        // Get form data
        $name = htmlspecialchars($_POST['name']);
        $email = htmlspecialchars($_POST['email']);
        $message = htmlspecialchars($_POST['message']);

        // Check required fields
        if(!empty($email) && !empty($name) && !empty($message)) {
            // Passed
            

            // Check for valid email
            if(filter_var($email, FILTER_VALIDATE_EMAIL) === false) {
                // Invalid email
                $msg = 'Invalid email.';
                $msgClass = 'alert-danger';
            } else {
                // Valid email
                $toEmail = 'jason@redsundigitalkc.com';
                $subject = 'Contact Request From ' . $name;
                $body = '<h2>Contact Request</h2>
                    <h4>Name</h4> <p>'.$name.'</p>
                    <h4>Email</h4> <p>'.$email.'</p>
                    <h4>Message</h4> <p>'.$message.'</p>';

                $headers = "MIME-Version: 1.0" . "\r\n";
                $headers .= "Content-Type:text/html;charset=UTF-8;" . "\r\n";

                // Additional headers
                $headers .= "From: " . $name . "<".$email.">". "\r\n";

                if (mail($toEmail, $subject, $body, $headers)) {
                    $msg = 'Your contact request has been sent.';
                    $msgClass = 'alert-success';
                } else {
                    $msg = 'Your contact request was not sent.';
                    $msgClass = 'alert-danger';
                }
            }
        } else {
            // Failed
            $msg = 'Please fill in all fields.';
            $msgClass = 'alert-danger';
        }
    }
?>

<!DOCTYPE html>
<head>
    <title>Contact Us</title>
    <link rel="stylesheet" href="https://bootswatch.com/4/cosmo/bootstrap.min.css">
</head>
<body>
    <div class="container">
        <?php if($msg != ''): ?>
            <div class="alert <?php echo $msgClass; ?>"><?php echo $msg; ?></div>
        <?php endif; ?>
        <form method="post" action="<?php echo $_SERVER['PHP_SELF']; ?>">
            <div class="form-group">
                <label>Name</label>
                <input type="text" name="name" class="form-control" value="<?php echo isset($_POST['name']) ? $name : ''; ?>">
            </div>
            <div class="form-group">
                <label>Email</label>
                <input type="text" name="email" class="form-control" value="<?php echo isset($_POST['email']) ? $email : ''; ?>">
            </div>
            <div class="form-group">
                <label>Message</label>
                <textarea name="message" class="form-control"><?php echo isset($_POST['message']) ? $message : ''; ?></textarea>
            </div>
            <br>
            <button type="submit" name="submit" class="btn btn-primary">Submit</button>
        </form>
    </div>
</body>
</html>