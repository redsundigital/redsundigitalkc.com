<?php   
    $msg = '';          # The message to show when the form has been submitted.
    $msgClass = '';     # The class to apply to the message element on submit.
    $errorClass = '';   # The class to use on error.   //TODO: decide classname and update scss.
    $successClass = ''; # The class to use on success. //TODO: decide classname and update scss.

    $emailRecipient = 'info@redsundigitalkc.com'; # Who receives the contact request.

    $name = '';
    $email = '';
    $message = '';

    # On submit:
    if(filter_has_var(INPUT_POST, 'submit')) {
        # Get form data
        $name = htmlspecialchars($_POST['name']);
        $email = htmlspecialchars($_POST['email']);
        $message = htmlspecialchars($_POST['message']);

        # Check for empty required fields:
        if(!empty($email) && !empty($name) && !empty($message)) {            

            # Validate email:
            if(!filter_var($email, FILTER_VALIDATE_EMAIL)) {
                # Email entered is INVALID.
                $msg = 'Invalid email.';
                $msgClass = $errorClass;
            } else {
                # Email entered is VALID.
                $toEmail = $emailRecipient;
                $subject = 'Contact Request From '.$name;
                $body = 
                    '<h2>Contact Request</h2>
                    <h4>Name</h4> <p>'.$name.'</p>
                    <h4>Email</h4> <p>'.$email.'</p>
                    <h4>Message</h4> <p>'.$message.'</p>';

                $headers = "MIME-Version: 1.0" . "\r\n";
                $headers .= "Content-Type:text/html;charset=UTF-8;"."\r\n";
                $headers .= 'From: '.$name.'<'.$email.'>'."\r\n";

                # Send the email:
                if (mail($toEmail, $subject, $body, $headers)) {
                    # Email success
                    $msg = 'Your contact request has been sent.';
                    $msgClass = $successClass;
                    echo "<script>alert('$msg');</script>"
                } else {
                    # Email failed
                    $msg = 'Your contact request was not sent.';
                    $msgClass = $errorClass;
                    echo "<script>alert('$msg');</script>"
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
    <a href="#contact" data-glitch="Contact" class="navscreen-link">Contact</a></li>
    <div class="socials">
      <!-- <a href="" class="navscreen-link"><i class="fa fa-facebook"></i></a>
      <a href="" class="navscreen-link"><i class="fa fa-linkedin"></i></a>
      <a href="" class="navscreen-link"><i class="fa fab fa-instagram"></i></a> -->
      <a href="http://midwaste.herokuapp.com/home" target="_blank" class="navscreen-link"><i
          class="fa fa-gamepad"></i></a>
    </div>
  </div>

  <!-- Landing -->
  <section id="home">
    <div class="brand">
      <span class="brand-text brand-primary">//RedSunDigital</span>
      <span class="brand-text brand-secondary typewriter">Web & Media Solutions</span>
      <span class="brand-text brand-primary mobile">Red<br>Sun<br>Digi<br>tal<span class="fill">.</span></span>
      <span class="brand-text brand-secondary mobile">Web<br>&<br>Media</span>
    </div>
  </section>

  <!-- Services -->
  <section id="services">
    <h1>Services</h1>

    <h3></h3>

    <div class="service-cards">
      <div class="card">
        <h3 class="card-title">Web</h3>
        <div class="card-image">
          <img src="/assets/img/globe.svg" alt="" srcset="">
        </div>
        <p class="card-body">
          Have an idea for a website? We'll bring it to life, or give your existing site a facelift.
      </div>

      <div class="card">
        <div class="card-image">
          <h3 class="card-title">Media</h3>
          <img src="/assets/img/video.svg" alt="" srcset="">
        </div>
        <p class="card-body">Next-level graphic design, video production and branding.</p>
      </div>

      <div class="card">
        <div class="card-image">
          <h3 class="card-title">Mobile</h3>
          <img src="/assets/img/android.svg" alt="" srcset="">
        </div>
        <p class="card-body">Custom Android and progressive web apps to suit your mobile needs.</p>
      </div>

      <div class="card">
        <div class="card-image">
          <h3 class="card-title">Custom</h3>
          <img src="/assets/img/programming.svg" alt="" srcset="">
        </div>
        <p class="card-body">From simple websites to IoT applications, we have the solutions for your business. </p>
      </div>
    </div>

    <a href="#contact" class="call-to-action">Contact</a>
    </div>
  </section>

  <!-- Our Work -->
  <section id="portfolio">
    <div id="our-work">

      <div class="block block1">
        <h1>Our Work</h1>
        <p>Check out some of our best work so far.</p>
      </div>

      <!-- FLIS -->
      <figure class="figure1">
        <img src="/assets/img/flsd-web-demo.png" class="figure-img">
        <div class="figure-overlay">
          <h3>Forklift Information System</h3>
          <p>A safety solution engineered to prevent forklift-related accidents, injuries, and property damage by
            providing real-time monitoring and safety alerts well before accidents occur.
          </p>
          <br>
          <ul class="overlay-links">
            <li>
              <p>More info and an interactive demo <a href="https://www.oeattachments.com/forklift-safety-device/"
                  target="_blank">here.</a></p>
            </li>
          </ul>
        </div>
      </figure>

      <!-- Midwaste -->
      <figure class="figure2">
        <img src="/assets/img/mw-1.png" class="figure-img">
        <div class="figure-overlay">
          <h3>Midwaste</h3>
          <p>Free-to-play zombie survival you can play in your browser.</p>
          <ul class="overlay-links">
            <li><a href="http://midwaste.herokuapp.com/home" target="_blank">Play</i></a></li>
          </ul>
        </div>
      </figure>

      <!-- Photobooth -->
      <figure class="figure3">
        <img src="/assets/img/photobooth.jpg" class="figure-img">
        <div class="figure-overlay">
          <h3>Photobooth</h3>
          <p>Raspberry Pi powered photobooth kiosk that you can control with your phone.</p>
          <br>
          <p>Demo coming soon...</p>
          <ul class="overlay-links">
            <!-- Do not remove -->
          </ul>
        </div>
      </figure>

      <!-- Pellet Smoker Dashboard -->
      <figure class="figure4">
        <img src="/assets/img/dashboard.png" class="figure-img">
        <div class="figure-overlay">
          <h3>BBQ Dashboard</h3>
          <p>MQTT cloud application for monitoring bluetooth probes connected to your pellet smoker.</p>
          <br>
          <p>Demo coming soon...</p>
          <ul class="overlay-links">
            <!-- Do not remove -->
          </ul>
        </div>
      </figure>

      <!-- Cut Optimizer -->
      <figure class="figure5">
        <img
          src="https://images.unsplash.com/photo-1513710239666-c29e2c09dc32?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80"
          class="figure-img">
        <div class="figure-overlay">
          <h3>Cut Optimizer</h3>
          <p>Calculate the best cuts to make to reduce waste material.</p>
          <br>
          <p>Demo coming soon...</p>
          <ul class="overlay-links">
            <!-- Do not remove -->
          </ul>
        </div>
      </figure>

      <div class="block block2">
        <h3>Like what you see?</h3>
        <p><a href="#contact" class="block-link">Contact us.</a></p>
      </div>

    </div>

  </section>

  <!-- About Us -->
  <section id="about">
    <div class="about-text-wrapper">
      <h1>About Us</h1>
      <br>
      <div class="about-text">
        <p>
          Red Sun Digital is <span class="about-highlight">Justin Kane</span> and <span class="about-highlight">Jason
            Michael</span>.
        </p>
        <br>
        <p>
          We met while working together in manufacturing and quickly became friends.
          There was an obvious need for improvements to operator safety and productivity, so we decided to solve those
          problems with software. We created tools to reduce tedious and redundant data entry, as well as applications
          to calculate liquid blending specification results.
        </p>
        <br>
        <p>
          To boost our new abilities, we decided to move forward and join a coding bootcamp. Soon after that we became
          coworkers again working for a different company, a company that needed solutions similar to what we had built
          before.
          We immediately began building custom software solutions for physical problems. This lead to helping develop a
          new product, an
          <a href="https://www.oeattachments.com/forklift-safety-device/" target="_blank">Android app</a> to promote
          safe equipment
          operation.
        </p>
        <br>
        <p>
          Justin and Jason are both passionate about growing with technology and learning new things to add to our
          arsenal. Our strength lies in streamlining business processes and creating easy-to-use, custom solutions for
          your
          business.
        </p>
      </div>
    </div>
    <div class="about-img-wrapper">
      <img
        src="https://images.unsplash.com/photo-1575089976121-8ed7b2a54265?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
        alt="">
    </div>
  </section>

  <!-- Contact -->
  <section id="contact">
    <div class="contact-text">
      <h1>Contact</h1>
      <h3>Shoot us a message and we'll get back to you as quickly as possible.</h3>
    </div>
      <?php if($msg != ''): ?>
        <!-- TODO: position and style this element. -->
        <div class="alert <?php echo $msgClass; ?>" style="color: white;"><?php echo $msg; ?></div>
      <?php endif; ?>
    <form method="post" action="<?php echo $_SERVER['PHP_SELF']; ?>">
      <input type="text" name="name" placeholder="Name" value="<?php echo isset($_POST['name']) ? $name : ''; ?>">
      <input type="email" name="email" id="email" placeholder="Email" required pattern=".+@.+\..+" value="<?php echo isset($_POST['email']) ? $email : ''; ?>">
      <textarea id="message" name="message" placeholder="Message" rows="3" required><?php echo isset($_POST['message']) ? $message : ''; ?></textarea>
      <button type="submit" id="contact-send" class="call-to-action">Send</button>
    </form>
  </section>

  <script src="./assets/js/index.js"></script>
</body>

</html>