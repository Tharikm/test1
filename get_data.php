 <?php

    if(isset($_POST['submit']))
    {
        $username1 = $_POST['fname'];
        $password1 = $_POST['lname'];
        
    }

    // database details
    $host = "localhost";
    $username = "root";
    $password = "";
    $dbname = "sample";

    // creating a connection
    $con = mysqli_connect($host, $username, $password, $dbname);

    // to ensure that the connection is made
    if (!$con)
    {
        die("Connection failed!" . mysqli_connect_error());
    }

    // using sql to create a data entry query
    $sql = "INSERT INTO sampledb(username, password1) VALUES ('$username1','$password1')";
    
    // send query to the database to add values and confirm if successful
    $rs = mysqli_query($con, $sql);
    if ($rs) {
        // Redirect to home page
        header('Location: index.html');
        exit;
        } else {
        // Display error message on login page
        echo "Invalid login credentials";
        }
  
    // close connection
    mysqli_close($con);


?> 