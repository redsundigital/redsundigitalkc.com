<?php   
    # Error reporting
    error_reporting(-1);
    ini_set('display_errors', 'On');
    set_error_handler("var_dump");
    ini_set("mail.log", "/tmp/mail.log");
    ini_set("mail.add_x_header", TRUE);

    $msg = '';          # The message to show when the form has been submitted.
    $msgClass = '';     # The class to apply to the message element on submit.
    $errorClass = '';   # The class to use on error.   //TODO: decide classname and update scss.
    $successClass = ''; # The class to use on success. //TODO: decide classname and update scss.

    $emailRecipient = 'info@redsundigitalkc.com'; # Who receives the contact request.

    # On submit:
    if(filter_has_var(INPUT_POST, 'submit')) {
        # Get form data
        $name = htmlspecialchars($_POST['name']);
        $email = htmlspecialchars($_POST['email']);
        $message = htmlspecialchars($_POST['message']);

        # Check for empty required fields:
        if(!empty($email) && !empty($name) && !empty($message)) {            

            # Validate email:
            if(filter_var($email, FILTER_VALIDATE_EMAIL) === false) {
                # Email entered is INVALID.
                $msg = 'Invalid email.';
                $msgClass = $errorClass;
            } else {
                # Email entered is VALID.
                $toEmail = $emailRecipient;
                $subject = 'Contact Request From ' . $name;
                $body = 
                    '<h2>Contact Request</h2>
                    <h4>Name</h4> <p>'.$name.'</p>
                    <h4>Email</h4> <p>'.$email.'</p>
                    <h4>Message</h4> <p>'.$message.'</p>';

                $headers = "MIME-Version: 1.0" . "\r\n";
                $headers .= "Content-Type:text/html;charset=UTF-8;"."\r\n";
                #$headers .= "From: ".$name."<".$email.">"."\r\n";
                $headers .= "From: ". $emailRecipient ."\r\n";

                # Send the email:
                if (mail($toEmail, $subject, $body, $headers)) {
                    # Email success
                    $msg = 'Your contact request has been sent.';
                    $msgClass = $successClass;
                } else {
                    # Email failed
                    $msg = 'Your contact request was not sent.';
                    $msgClass = $errorClass;
                }
            }
        } else {
                # A required field was not entered.
                $msg = 'Please fill in all fields.';
                $msgClass = $errorClass;
        }
    }
?>

<!DOCTYPE html>
<html lang="en">

<head>
  <title>Red Sun Digital</title>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
    integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossorigin="anonymous">
  <link rel="stylesheet" href="./assets/css/base.css/base.css">
</head>

<body>
  <!-- Nav toggle -->
  <div id="navtoggle"><i class="fa fas fa-eject fa-3x"></i></div>

  <!-- Nav Screen -->
  <div id="navscreen">
    <a href="#home" data-glitch="Home" class="navscreen-link">Home</a></li>
    <a href="#services" data-glitch="Services" class="navscreen-link">Services</a></li>
    <a href="#portfolio" data-glitch="Our Work" class="navscreen-link">Our Work</a></li>
    <a href="#about" data-glitch="About Us" class="navscreen-link">About Us</a></li>
    <a href="contact.php" data-glitch="Contact" class="navscreen-link">Contact</a></li>
    <div class="socials">
      <!-- <a href="" class="navscreen-link"><i class="fa fa-facebook"></i></a>
      <a href="" class="navscreen-link"><i class="fa fa-linkedin"></i></a>
      <a href="" class="navscreen-link"><i class="fa fab fa-instagram"></i></a> -->
      <a href="http://midwaste.herokuapp.com/home" target="_blank" class="navscreen-link"><i
          class="fa fa-gamepad"></i></a>
    </div>
  </div>

  <!-- Contact -->
  <section id="contact">
    <div class="contact-text">
      <h1>Contact</h1>
      <?php if($msg != ''): ?>
        <h3 class="<?php echo $msgClass; ?>"><?php echo $msg; ?></h3>
      <?php else: ?>
        <h3>Shoot us a message and we'll get back to you as quickly as possible.</h3>
      <?php endif; ?>
    </div>
    <form method="post" action="<?php echo $_SERVER['PHP_SELF']; ?>">
      <input type="text" name="name" placeholder="Name" value="<?php echo isset($_POST['name']) ? $name : ''; ?>">
      <input type="email" name="email" id="email" placeholder="Email" required pattern=".+@.+\..+" value="<?php echo isset($_POST['email']) ? $email : ''; ?>">
      <textarea id="message" name="message" placeholder="Message" rows="3" required><?php echo isset($_POST['message']) ? $message : ''; ?></textarea>
      <button type="submit" name="submit" class="call-to-action">Send</button>
    </form>
  </section>

  <script src="./assets/js/index.js"></script>
</body>

</html>