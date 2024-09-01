<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);
class QwitterDb
{
    private $dbname;
    private $host;
    private $username;
    private $port;
    private $password;

    public function __construct($dbname, $host, $username, $port, $password)
    {
        $this->dbname = $dbname;
        $this->host = $host;
        $this->username = $username;
        $this->port = $port;
        $this->password = $password;
    }

    public function dbConnect()
    {
        try {
            $dbsql = new PDO(
                "pgsql:dbname=$this->dbname;host=$this->host;
            port=$this->port",
                $this->username,
                $this->password
            );
            $dbsql->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            return $dbsql;
        } catch (PDOException $e) {
            echo "Erreur : " . $e->getMessage();
        }
    }

    public function inscription()
    {
        $password = hash(
            "ripemd160",
            $_POST["password"] . "vive le projet tweet_academy"
        );
        $birthdate = strtotime($_POST["birthdate"] . " 00:00:00");
        $birthdate = date("Y-m-d", $birthdate);
        $dbsql = $this->dbConnect();
        $req = "INSERT INTO account (full_name, username, email, password, 
        birthdate, creation_date)  VALUES (?, ?, ?, ?, ?, ?)";
        var_dump($req);
        var_dump($dbsql);
        $stmt = $dbsql->prepare($req);
        $stmt->execute([
            $_POST["fullname"],
            $_POST["username"],
            $_POST["email"],
            $password,
            $birthdate,
            date("Y-m-d"),
        ]);
        echo "Success";
    }

    public function connexion()
    {
        $password = hash(
            "ripemd160",
            $_POST['password'] . "vive le projet tweet_academy"
        );
        $req = "SELECT * FROM account WHERE email = ? AND deleted_account = false";
        $dbsql = $this->dbConnect();
        $stmt = $dbsql->prepare($req);
        $stmt->execute([$_POST["email"]]);
        $result = $stmt->fetch();
        if ($result) {
            if ($password === $result["password"]) {
                session_start();
                $_SESSION["username"] = $result["username"];
                $_SESSION["id"] = $result["id"];
                echo "Success";
            } else {
                echo "Error no password";
            }
        } else {
            echo "Error no mail";
        }
    }

    public function isLogged()
    {
        session_start();
        if (isset($_SESSION["username"])) {
            echo "Success";
        } else {
            echo "Error";
        }
    }

    public function sendPm()
    {
        session_start();
        $dbsql = $this->dbConnect();
        $req = "INSERT INTO private_message 
        (id_account_1, id_account_2, content, date_sended) 
        VALUES (?, ?, ?, ?)";
        $stmt = $dbsql->prepare($req);
        $stmt->execute(
            array(
                $_SESSION['id'],
                $_POST['iduser'],
                $_POST['content'],
                date("Y-m-d H:i:s")
            )
        );
        echo "Success";
    }

    public function privateM()
    {
        session_start();
        $dbsql = $this->dbConnect();
        $req = "SELECT * FROM account INNER JOIN private_message 
        ON private_message.id_account_1 = account.id 
        WHERE private_message.id_account_1 = ? 
        AND private_message.id_account_2 = ? OR private_message.id_account_2 = ? 
        AND private_message.id_account_1 = ? AND deleted_account = false 
        ORDER BY private_message.date_sended ASC";
        $stmt = $dbsql->prepare($req);
        $stmt->execute(
            array(
                $_SESSION['id'],
                $_POST['iduser'],
                $_SESSION['id'],
                $_POST['iduser']
            )
        );
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        if ($result) {
            echo json_encode($result);
        } else {
            echo "Error";
        }
    }

    public function getProfilPm()
    {
        session_start();
        $dbsql = $this->dbConnect();
        $req = "SELECT * FROM account WHERE id = ? AND deleted_account = false";
        $stmt = $dbsql->prepare($req);
        $stmt->execute([$_POST["iduser"]]);
        $result = $stmt->fetch(PDO::FETCH_ASSOC);
        if ($result) {
            echo json_encode($result);
        } else {
            echo "Error";
        }
    }

    public function searchAt()
    {
        session_start();
        $dbsql = $this->dbConnect();
        $req = "SELECT * FROM account INNER JOIN follow 
        ON follow.id_account_follow = account.id 
        WHERE follow.id_account_follower = ? AND account.username 
        LIKE ? AND deleted_account = false";
        $stmt = $dbsql->prepare($req);
        $stmt->execute([$_SESSION["id"], $_POST["at"] . "%"]);
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        if ($result) {
            echo json_encode($result);
        } else {
            echo "Error";
        }
    }

    public function followsinfo()
    {
        session_start();
        $dbsql = $this->dbConnect();
        $req = "SELECT * FROM account WHERE id = ? AND deleted_account = false";
        $stmt = $dbsql->prepare($req);
        $stmt->execute([$_SESSION["id"]]);
        $result = $stmt->fetch(PDO::FETCH_ASSOC);
        if ($result) {
            echo json_encode($result);
        } else {
            echo "Error";
        }
    }

    public function search()
    {
        session_start();
        $dbsql = $this->dbConnect();
        $req = "SELECT * FROM account WHERE username 
        LIKE ? AND id != ? AND deleted_account = false";
        $stmt = $dbsql->prepare($req);
        $stmt->execute([$_POST["search"] . "%", $_SESSION["id"]]);
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        if ($result) {
            echo json_encode($result);
        } else {
            echo "Error";
        }
    }

    public function getProfile()
    {
        session_start();
        $dbsql = $this->dbConnect();
        $req = "SELECT * FROM account WHERE id = ? AND deleted_account = false";
        $stmt = $dbsql->prepare($req);
        $stmt->execute([$_SESSION["id"]]);
        $result = $stmt->fetch(PDO::FETCH_ASSOC);
        if (isset($_POST["id"]) && $_POST["id"] !== "undefined") {
            $req = "SELECT * FROM account WHERE id = ? AND deleted_account = false";
            $stmt = $dbsql->prepare($req);
            $stmt->execute([$_POST["id"]]);
            $result1 = $stmt->fetch(PDO::FETCH_ASSOC);
        }
        if ($result) {
            if (isset($result1)) {
                echo json_encode([$result, $result1]);
            } else {
                echo json_encode([$result]);
            }
        } else {
            echo "Vous n'êtes pas inscrit";
        }
    }

    public function newTweet()
    {
        session_start();
        $img1 = $_POST["img1"] != "null" ? $this->upload("img1") : null;
        $img2 = $_POST["img2"] != "null" ? $this->upload("img2") : null;
        $img3 = $_POST["img3"] != "null" ? $this->upload("img3") : null;
        $img4 = $_POST["img4"] != "null" ? $this->upload("img4") : null;
        $date = date("Y-m-d H:i:s");
        $dbsql = $this->dbConnect();
        $req = "INSERT INTO tweet 
        (content, creation_date, id_account_tweet, media_1, media_2, 
        media_3, media_4) 
        VALUES (?, ?, ?, ?, ?, ?, ?)";
        $stmt = $dbsql->prepare($req);
        $stmt->execute(
            array(
                $_POST['tweet'],
                $date,
                $_SESSION['id'],
                $img1,
                $img2,
                $img3,
                $img4
            )
        );
        echo "Success";
    }

    public function getTweet()
    {
        session_start();
        $id = $_POST["id"] != "undefined" ? $_POST["id"] : $_SESSION["id"];
        $dbsql = $this->dbConnect();
        $req = "SELECT *, tweet.id as idtweet, retweet.id 
        as idretweet, like_tweet.id as idlike FROM tweet 
        INNER JOIN account ON account.id = tweet.id_account_tweet
        LEFT JOIN like_tweet ON like_tweet.id_tweet = tweet.id 
        AND like_tweet.id_account = id_account_tweet 
        LEFT JOIN retweet ON retweet.id_tweet = tweet.id 
        and retweet.id_account = ?
        WHERE tweet.id_account_tweet = ? OR retweet.id_account = ?
        ORDER BY tweet.creation_date DESC";
        $stmt = $dbsql->prepare($req);
        $stmt->execute([$id, $id, $id]);
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        if ($result) {
            echo json_encode($result);
        } else {
        }
    }

    public function getMainTweet()
    {
        session_start();
        $dbsql = $this->dbConnect();

        $req = "SELECT *, tweet.id as idtweet, retweet.id 
        as idretweet, like_tweet.id as idlike
        FROM tweet INNER JOIN follow 
        ON follow.id_account_follow = tweet.id_account_tweet 
        INNER JOIN account ON account.id = tweet.id_account_tweet
        LEFT JOIN like_tweet ON like_tweet.id_tweet = tweet.id 
        AND like_tweet.id_account = follow.id_account_follower
        LEFT JOIN retweet ON retweet.id_tweet = tweet.id 
        AND retweet.id_account = follow.id_account_follower
        WHERE follow.id_account_follower = ? ORDER BY tweet.creation_date ASC";

        $stmt = $dbsql->prepare($req);
        $stmt->execute([$_SESSION["id"]]);
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        if ($result) {
            echo json_encode($result);
        } else {
        }
    }

    public function getProfilAt()
    {
        session_start();
        $dbsql = $this->dbConnect();
        $req =
            "SELECT * FROM account WHERE username = ? AND deleted_account = false";
        $stmt = $dbsql->prepare($req);
        $stmt->execute([$_POST["username"]]);
        $result = $stmt->fetch(PDO::FETCH_ASSOC);
        if ($result) {
            echo json_encode($result);
        } else {
        }
    }

    public function getComments()
    {
        session_start();
        $dbsql = $this->dbConnect();
        $req = "SELECT * FROM comments INNER JOIN account ON account.id =
        comments.id_account WHERE comments.id_tweet = ?  AND deleted_account = false
        ORDER BY comments_date DESC";
        $stmt = $dbsql->prepare($req);
        $stmt->execute([$_POST["idtweet"]]);
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        if ($result) {
            echo json_encode($result);
        } else {
        }
    }

    public function newComment()
    {
        session_start();
        $date = date("Y-m-d H:i:s");
        $dbsql = $this->dbConnect();
        $req = "INSERT INTO comments (content, comments_date, id_account, id_tweet) 
        VALUES (?, ?, ?, ?)";
        $stmt = $dbsql->prepare($req);
        $stmt->execute(
            array($_POST['comment'], $date, $_SESSION['id'], $_POST['idtweet'])
        );
        echo "Success";
    }

    public function setProfile()
    {
        try {
            session_start();
            $dbsql = $this->dbConnect();
            $profilepic = null;
            $headerpic = null;

            $requete = "SELECT profile_picture, header 
        FROM account WHERE id = ? AND deleted_account = false";
            $stmt = $dbsql->prepare($requete);
            $stmt->execute([$_SESSION["id"]]);
            $result = $stmt->fetch(PDO::FETCH_ASSOC);
            $_FILES["imageprofile"] ? $profilepic = $this->upload("imageprofile") : $profilepic = $result['profile_picture'];
            $_FILES["imagecover"] ? $headerpic = $this->upload("imagecover") : $headerpic = $result['header'];
            $idpdp = $profilepic;
            $idhdp = $headerpic;
            $link = $_POST['website'];
            $bio = $_POST['bio'];
            $location = $_POST['location'];
            $username = $_POST['username'];
            $req = "UPDATE account SET profile_picture = ?, header = ?, 
        location = ?, link = ?, bio = ?, full_name = ? 
        WHERE id = ? AND deleted_account = false";
            $stmt = $dbsql->prepare($req);
            $stmt->execute(
                array(
                    $idpdp,
                    $idhdp,
                    $location,
                    $link,
                    $bio,
                    $username,
                    $_SESSION['id']
                )
            );
            echo "Success";
        } catch (Exception $e) {
            echo $e;
        }
    }

    public function getHashtag()
    {
        session_start();
        $dbsql = $this->dbConnect();
        $req = "SELECT * FROM tweet INNER JOIN account 
        ON account.id = tweet.id_account_tweet WHERE content 
        like ? AND deleted_account = false OR content like ? AND deleted_account = false";
        $stmt = $dbsql->prepare($req);
        $stmt->execute(
            array(
                "%#" . $_POST['search'] . "% %",
                "%#" . $_POST['search'] . "%"
            )
        );
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        if ($result) {
            echo json_encode($result);
        } else {
            echo "Error";
        }
    }

    public function getTweetHashtag()
    {
        session_start();
        $dbsql = $this->dbConnect();
        $req = "SELECT * FROM tweet INNER JOIN account 
        ON account.id = tweet.id_account_tweet WHERE content 
        like ? AND deleted_account = false OR content like ? AND deleted_account = false";
        $stmt = $dbsql->prepare($req);
        $stmt->execute(
            array(
                "% #" . $_POST['hashtag'] . " %",
                "%#" . $_POST['hashtag']
            )
        );
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        if ($result) {
            echo json_encode($result);
        }
    }

    public function upload($name)
    {
        // Répertoire cible pour l'enregistrement du fichier
        $target_dir = "../model/upload/";

        // Obtenir les informations du fichier téléchargé
        $info = pathinfo($_FILES[$name]["name"]);

        // Générer un nom de fichier unique
        $unique_name = uniqid();

        // Créer le chemin complet du fichier cible
        $target_file = $target_dir . $unique_name . "." . $info["extension"];

        // Déplacer le fichier téléchargé vers le répertoire cible
        if (move_uploaded_file($_FILES[$name]["tmp_name"], $target_file)) {
            // Retourner le nom du fichier enregistré
            return $unique_name . "." . $info["extension"];
        } else {
            // En cas d'échec, retourner false ou un message d'erreur
            return false;
        }
    }


    function follow()
    {
        if (!$this->checkfollow()) {
            $dbsql = $this->dbConnect();
            session_start();
            $date = date("Y-m-d H:i:s");
            $query = "INSERT INTO follow 
            (id_account_follow, id_account_follower, starting_date)
        VALUES (?, ?, ?)";
            $stmt = $dbsql->prepare($query);
            $stmt->execute(array($_POST['id'], $_SESSION['id'], $date));
            $lastid = $dbsql->lastInsertId();
            echo json_encode($lastid);
        }
    }

    function unfollow()
    {
        session_start();
        $dbsql = $this->dbConnect();
        $query = "DELETE FROM follow WHERE id = ?";
        $stmt = $dbsql->prepare($query);
        $stmt->execute(array($_POST["id"]));
        echo json_encode("Success");
    }

    function checkfollow()
    {
        session_start();
        $query = "SELECT * FROM follow WHERE id_account_follow = ? AND
            id_account_follower = ?";
        $dbsql = $this->dbConnect();
        $stmt = $dbsql->prepare($query);
        $stmt->execute(array($_POST['id'], $_SESSION['id']));
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        if ($result) {
            echo json_encode($result);
        }
        return $result["id"];
    }

    function follower()
    {
        session_start();
        $dbsql = $this->dbConnect();
        $id = $_POST['id'] !== "undefined" ? $_POST['id'] : $_SESSION['id'];
        $query = "SELECT * FROM follow INNER JOIN account 
        ON account.id = follow.id_account_follow WHERE id_account_follower = ? 
        AND id_account_follow != ? AND deleted_account = false";
        $dbsql = $this->dbConnect();
        $stmt = $dbsql->prepare($query);
        $stmt->execute(array($id, $id));
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        if ($result) {
            echo json_encode($result);
        }
    }


    function followed()
    {
        session_start();
        $dbsql = $this->dbConnect();
        $id = $_POST['id'] !== "undefined" ? $_POST['id'] : $_SESSION['id'];
        $query = "SELECT * FROM follow  
        INNER JOIN account ON account.id = follow.id_account_follower 
        WHERE id_account_follow = ? AND id_account_follower != ? 
        AND deleted_account = false";
        $dbsql = $this->dbConnect();
        $stmt = $dbsql->prepare($query);
        $stmt->execute([$id, $id]);
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        if ($result) {
            echo json_encode($result);
        }
    }

    function listfollowed()
    {
        session_start();
        $dbsql = $this->dbConnect();
        $query = "SELECT * FROM follow 
        INNER JOIN account ON account.id = follow.id_account_follow 
        WHERE id_account_follower = ? AND deleted_account = false";
        $dbsql = $this->dbConnect();
        $stmt = $dbsql->prepare($query);
        $stmt->execute([$_SESSION["id"]]);
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        if ($result) {
            echo json_encode($result);
        }
    }

    function listfollower()
    {
        session_start();
        $dbsql = $this->dbConnect();
        $query = "SELECT * FROM follow 
        INNER JOIN account ON account.id = follow.id_account_follower 
        WHERE id_account_follow = ? AND deleted_account = false";
        $dbsql = $this->dbConnect();
        $stmt = $dbsql->prepare($query);
        $stmt->execute([$_SESSION["id"]]);
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        if ($result) {
            echo json_encode($result);
        }
    }
    function setlikes()
    {
        $dbsql = $this->dbConnect();
        session_start();
        $date = date("Y-m-d H:i:s");
        $req = "INSERT INTO like_tweet 
            (id_tweet, id_account, date_like) 
            VALUES (?, ?, ?)";
        $stmt = $dbsql->prepare($req);
        $stmt->execute(array(intval($_POST['id']), $_SESSION['id'], $date));
        $lastid = $dbsql->lastInsertId();
        echo json_encode($lastid);
    }
    function setrt()
    {
        $dbsql = $this->dbConnect();
        session_start();
        $date = date("Y-m-d H:i:s");
        $req = "INSERT INTO retweet 
        (id_tweet, id_account, creation_date) 
        VALUES (?, ?, ?)";
        $stmt = $dbsql->prepare($req);
        $stmt->execute(array(intval($_POST['id']), $_SESSION['id'], $date));
        $lastid = $dbsql->lastInsertId();
        echo json_encode($lastid);
    }
    function unrt()
    {
        $dbsql = $this->dbConnect();
        session_start();
        $req = "DELETE FROM retweet WHERE id = ?";
        $stmt = $dbsql->prepare($req);
        $stmt = $dbsql->prepare($req);
        $stmt->execute(array(intval($_POST['idrt'])));
        echo json_encode("Success");
    }
    function unlike()
    {
        $dbsql = $this->dbConnect();
        session_start();
        $req = "DELETE FROM like_tweet WHERE id = ?";
        $stmt = $dbsql->prepare($req);
        $stmt->execute(array(intval($_POST['idlike'])));
        echo json_encode("Success");
    }
    function getlikes()
    {
        $dbsql = $this->dbConnect();
        session_start();
        $req = "SELECT * FROM like_tweet WHERE id_tweet = ? and id_account = ?";
        $stmt = $dbsql->prepare($req);
        $stmt->execute(array(intval($_POST['idtweet']), $_SESSION['id']));
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        if ($result) {
            echo json_encode($result);
        }
    }
    function delete()
    {
        session_start();
        $dbsql = $this->dbConnect();
        $query = "UPDATE account SET deleted_account = true WHERE id = ?";
        $stmt = $dbsql->prepare($query);
        $stmt->execute(array($_SESSION['id']));
        session_reset();
        session_destroy();
        $_COOKIE = array();
        echo json_encode("Success");
    }
    function checkrt()
    {
        $dbsql = $this->dbConnect();
        session_start();
        $req = "SELECT * FROM retweet WHERE id_tweet = ? and id_account = ?";
        $stmt = $dbsql->prepare($req);
        $stmt->execute(array(intval($_POST['idtweet']), $_SESSION['id']));
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        if ($result) {
            echo json_encode($result);
        }
    }
    function logout()
    {
        session_start();
        session_reset();
        session_destroy();
        $_COOKIE = array();
        echo json_encode("Success");
    }
    function countweet()
    {
        session_start();
        $dbsql = $this->dbConnect();
        $id = $_POST['id'] !== "undefined" ? $_POST['id'] : $_SESSION['id'];
        $query = "SELECT COUNT(*) as count FROM tweet WHERE id_account_tweet = ?";
        $stmt = $dbsql->prepare($query);
        $stmt->execute(array($id));
        $result = $stmt->fetch(PDO::FETCH_ASSOC);
        if ($result) {
            echo json_encode($result);
        }
    }
}
