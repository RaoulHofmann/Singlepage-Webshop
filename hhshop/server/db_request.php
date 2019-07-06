<?php

class db_request
{
    private function dbConnect()
    {
        $servername = "127.0.0.1";
        $username = "X32798271";
        $password = "X32798271";
        $db = "X32798271";

        $conn = mysqli_connect($servername, $username, $password, $db);

        if (!$conn) {
            echo "Connection failed: " . mysqli_connect_errno();
        }

        return $conn;
    }

    function isAdmin($userID)
    {
        $connection = $this->dbConnect();

        $result = mysqli_query($connection, "SELECT isAdmin FROM User WHERE userID='$userID'");

        mysqli_close($connection);

        if ($result) {
            $row = mysqli_fetch_row($result);
            if ($row[0] == 0) {
                return false;
            } else if ($row[0] == 1) {
                return true;
            }
        }
    }

    function getUserId($username)
    {
        $connection = $this->dbConnect();

        $result = mysqli_query($connection, "SELECT userID FROM User WHERE username='$username'");

        mysqli_close($connection);

        if ($result) {
            $row = mysqli_fetch_assoc($result);
            return $row;
        }
    }

    function getUser($userID)
    {
        $connection = $this->dbConnect();

        if ($connection) {
            $query = mysqli_query($connection, "SELECT * FROM User WHERE userID='$userID'");

            mysqli_close($connection);

            if ($query) {
                while ($row = mysqli_fetch_assoc($query)) {
                    $result = $row;
                }
                return $result;
            }
        }
    }

    function getAllUsers()
    {
        $connection = $this->dbConnect();

        if ($connection) {
            $query = mysqli_query($connection, "SELECT * FROM User");

            mysqli_close($connection);

            if ($query) {
                while ($row = mysqli_fetch_assoc($query)) {
                    $result[] = $row;
                }
                return $result;
            }
        }
    }

    function login($username, $pwd)
    {
        $connection = $this->dbConnect();

        if ($connection) {
            $pwd = md5($pwd);

            $query = "SELECT userID FROM User WHERE username=? AND password=?";
            $stmt = $connection->prepare($query);
            $stmt->bind_param('ss', $username, $pwd);
            $stmt->execute();

            $result = $stmt->fetch();

            $stmt->close();
            $connection->close();

            if ($result == 1) {
                return true;
            } else {
                return false;
            }
        }
    }

    function updateAccount($userData)
    {
        $connection = $this->dbConnect();

        if ($connection) {
            if ($userData->password != NULL) {
                $password = md5($userData->password);
                if (isset($userData->isadmin)) {
                    $query = "UPDATE User SET username=?, isAdmin=?, password=?, first_name=?, last_name=?, email=?, street=?, postcode=?, city=? WHERE userID=?";
                    $stmt = $connection->prepare($query);
                    $stmt->bind_param('sdsssssdsd', $userData->username, $userData->isadmin, $password, $userData->firstname, $userData->lastname, $userData->email, $userData->street, $userData->postcode, $userData->city, $userData->userid);
                } else {
                    $query = "UPDATE User SET username=?, password=?, first_name=?, last_name=?, email=?, street=?, postcode=?, city=? WHERE userID=?";
                    $stmt = $connection->prepare($query);
                    $stmt->bind_param('ssssssdsd', $userData->username, $password, $userData->firstname, $userData->lastname, $userData->email, $userData->street, $userData->postcode, $userData->city, $userData->userid);
                }
            } else {
                if (isset($userData->isadmin)) {
                    $query = "UPDATE User SET username=?, isAdmin=?, first_name=?, last_name=?, email=?, street=?, postcode=?, city=? WHERE userID=?";
                    $stmt = $connection->prepare($query);
                    $stmt->bind_param('sdssssdsd', $userData->username, $userData->isadmin, $userData->firstname, $userData->lastname, $userData->email, $userData->street, $userData->postcode, $userData->city, $userData->userid);
                } else {
                    $query = "UPDATE User SET username=?, first_name=?, last_name=?, email=?, street=?, postcode=?, city=? WHERE userID=?";
                    $stmt = $connection->prepare($query);
                    $stmt->bind_param('sssssdsd', $userData->username, $userData->firstname, $userData->lastname, $userData->email, $userData->street, $userData->postcode, $userData->city, $userData->userid);
                }
            }

            $stmt->execute();

            if (empty($stmt->error)) {
                $result = 1;
            } else {
                $result = 0;
            }

            $stmt->close();
            $connection->close();

            if ($result == 1) {
                return true;
            } else {
                return false;
            }
        }
    }

    function register($userData)
    {
        $connection = $this->dbConnect();

        if ($connection) {
            if (isset($userData->isadmin)) {
                $query = "INSERT INTO User (username, isAdmin, password, first_name, last_name, email, street, postcode, city, country) VALUES (?, ?, ?, ?, ?,?, ?, ?, ?, ?)";
                $pwd = md5($userData->password);
                $stmt = $connection->prepare($query);
                $stmt->bind_param('sdsssssiss', $userData->username, $userData->isadmin, $pwd, $userData->firstname, $userData->lastname, $userData->email, $userData->street, $userData->postcode, $userData->city, $userData->country);
            } else {
                $query = "INSERT INTO User (username, password, first_name, last_name, email, street, postcode, city, country) VALUES (?, ?, ?, ?,?, ?, ?, ?, ?)";
                $pwd = md5($userData->password);
                $stmt = $connection->prepare($query);
                $stmt->bind_param('ssssssiss', $userData->username, $pwd, $userData->firstname, $userData->lastname, $userData->email, $userData->street, $userData->postcode, $userData->city, $userData->country);
            }
            $stmt->execute();

            if (empty($stmt->error)) {
                $result = 1;
            } else {
                $result = 0;
            }

            $stmt->close();
            $connection->close();

            if ($result == 1) {
                return true;
            } else {
                return false;
            }
        }
    }

    function deleteUser($userID)
    {
        $connection = $this->dbConnect();

        if ($connection) {
            $query = "DELETE FROM User WHERE userID = ?";
            $stmt = $connection->prepare($query);
            $stmt->bind_param('d', $userID);

            $stmt->execute();

            if (empty($stmt->error)) {
                $result = 1;
            } else {
                $result = 0;
            }

            $stmt->close();
            $connection->close();

            if ($result == 1) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    function updateProduct($updateProduct)
    {
        $connection = $this->dbConnect();

        if ($connection) {
            $result = mysqli_query($connection, "UPDATE Product SET name = '" . $updateProduct->productName . "', description = '" . $updateProduct->productDesc . "', quantity = '" . $updateProduct->productQuant . "', color = '" . $updateProduct->productColor . "', price = '" . $updateProduct->productPrice . "', brandID = '" . $updateProduct->productBrand . "', catID = '" . $updateProduct->productCat . "', image = '" . $updateProduct->productImg . "' WHERE productID = '" . $updateProduct->productID . "' ");

            mysqli_close($connection);

            if ($result == 1) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    function addProduct($updateProduct)
    {
        $connection = $this->dbConnect();

        if ($connection) {
            $result = mysqli_query($connection, "INSERT INTO Product (name, description, quantity, color, price, brandID, catID, image) VALUES ('" . $updateProduct->productName . "', '" . $updateProduct->productDesc . "', '" . $updateProduct->productQuant . "', color = '" . $updateProduct->productColor . "', '" . $updateProduct->productPrice . "', '" . $updateProduct->productBrand . "', '" . $updateProduct->productCat . "', '" . $updateProduct->productImg . "')");

            mysqli_close($connection);

            if ($result == 1) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    function deleteProduct($productID)
    {
        $connection = $this->dbConnect();

        if ($connection) {
            $result = mysqli_query($connection, "DELETE FROM Product WHERE productID = '" . $productID . "'");

            mysqli_close($connection);

            if ($result == 1) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    function getAllProducts()
    {

        $connection = $this->dbConnect();
        if ($connection) {
            $result = mysqli_query($connection, "SELECT * FROM Product");

            mysqli_close($connection);

            if ($result) {
                while ($row = mysqli_fetch_assoc($result)) {
                    $products[] = $row;
                }
                return $products;
            }
        } else {
            return false;
        }
    }

    function getCategoryList()
    {
        $connection = $this->dbConnect();

        if ($connection) {
            $result = mysqli_query($connection, "SELECT * FROM Category");

            mysqli_close($connection);

            if ($result) {
                while ($row = mysqli_fetch_assoc($result)) {
                    $categories[] = $row;
                }
                return $categories;
            }
        } else {
            return false;
        }
    }

    function getCategoryProducts($category)
    {
        $connection = $this->dbConnect();

        if ($connection) {
            $result = mysqli_query($connection, "SELECT * FROM Product WHERE catID='$category'");

            mysqli_close($connection);

            if ($result) {
                while ($row = mysqli_fetch_assoc($result)) {
                    $products[] = $row;
                }
                if(!empty($products)) {
                    return $products;
                } else {
                    return false;
                }
            }
        } else {
            return false;
        }
    }

    function getProducts($productID)
    {
        $connection = $this->dbConnect();
        if ($connection) {
            $result = mysqli_query($connection, "SELECT * FROM Product WHERE productID='$productID'");

            mysqli_close($connection);

            if ($result) {
                while ($row = mysqli_fetch_assoc($result)) {
                    $product = $row;
                }
                return $product;
            }
        } else {
            return false;
        }
    }

    function categorySearch($searchInput)
    {
        $connection = $this->dbConnect();
        $category = null;
        if ($connection) {
            $result = mysqli_query($connection, "SELECT catID FROM Category WHERE name LIKE '%" . $searchInput . "%'");

            if ($result) {
                while ($row = mysqli_fetch_assoc($result)) {
                    $category[] = $row;
                }
                return $category;
            }
        } else {
            return false;
        }

    }

    function productSearch($searchInput)
    {
        $connection = $this->dbConnect();
        $products = null;
        if ($connection) {
            $result = mysqli_query($connection, "SELECT productID FROM Product WHERE name LIKE '%" . $searchInput . "%'");

            if ($result) {
                while ($row = mysqli_fetch_assoc($result)) {
                    $products[] = $row;
                }
                return $products;
            }
        } else {
            return false;
        }
    }

    function createOrder($userID, $productID)
    {
        $connection = $this->dbConnect();

        if ($connection) {
            $order = mysqli_query($connection, "SELECT orderID FROM `Order` WHERE userID = " . $userID . " AND status = 0");

            if ($order->num_rows == 0) {
                $order = mysqli_query($connection, "INSERT INTO `Order`(`status`,`userID`)VALUES(0," . $userID . ")");

                if ($order) {
                    $order = mysqli_query($connection, "SELECT orderID FROM `Order` WHERE userID = " . $userID . " AND status = 0");
                }
            }

            while ($row = mysqli_fetch_assoc($order)) {
                $orderInfo = $row;
            }
            $orderProductID = mysqli_query($connection, "SELECT orderProductID FROM Order_Product WHERE orderID = " . $orderInfo['orderID'] . " AND productID = " . $productID . " ");

            if ($orderProductID->num_rows == 0) {
                $orderProduct = mysqli_query($connection, "INSERT INTO Order_Product(quantity, productID, orderID)VALUES(1, " . $productID . ", " . $orderInfo['orderID'] . ")");

                if ($orderProduct) {
                    $orderProductID = mysqli_query($connection, "SELECT orderProductID FROM Order_Product WHERE orderID = " . $orderInfo['orderID'] . " AND productID = " . $productID . " ");

                    if($orderProductID){
                        while ($row = mysqli_fetch_assoc($orderProductID)) {

                            $orderInfo += $row;
                        }
                    }
                }
            } else {

                while ($row = mysqli_fetch_assoc($orderProductID)) {
                    $orderInfo += $row;
                }

                $updateProductOrder = mysqli_query($connection, "UPDATE Order_Product SET quantity = quantity+1 WHERE orderProductID = ".$orderInfo['orderProductID']." ");
            }

            if(isset($orderInfo)) {
                return $orderInfo;
            } else {
                return false;
            }

        } else {
            return false;
        }
    }

    function addTotal($orderID)
    {
        $connection = $this->dbConnect();

        if ($connection) {
            $total = -1;
            $products = mysqli_query($connection, "SELECT quantity, productID FROM Order_Product WHERE orderID = " . $orderID . " ");

            if ($products) {
                $total = 0;
                while ($row = mysqli_fetch_assoc($products)) {
                    $price = mysqli_query($connection, "SELECT price FROM Product WHERE productID = " . $row['productID'] . " ");

                    if ($price) {
                        while ($productPrice = mysqli_fetch_assoc($price)) {
                            $total += ($row['quantity'] * $productPrice['price']);
                        }
                    }
                }
            }

            if ($total >= 0) {
                $updateTotal = mysqli_query($connection, "UPDATE `Order` SET total = " . $total . " WHERE orderID = " . $orderID . " ");

                if ($updateTotal == 1) {
                    return true;
                } else {
                    return false;
                }
            }
        }
    }

    function getCart($userID)
    {
        $connection = $this->dbConnect();

        if ($connection) {
            $order = mysqli_query($connection, "SELECT * FROM `Order` WHERE userID = " . $userID . " AND status = 0");

            if ($order) {
                while ($row = mysqli_fetch_assoc($order)) {
                    $cart[] = $row;
                }

                $orderProduct = mysqli_query($connection, "SELECT productID, quantity FROM Order_Product WHERE orderID = " . $cart[0]['orderID'] . " ");

                if ($orderProduct) {
                    while ($row = mysqli_fetch_assoc($orderProduct)) {

                        $products = mysqli_query($connection, "SELECT productID, name, price FROM Product WHERE productID = " . $row['productID'] . " ");

                        if ($products) {
                            while ($product = mysqli_fetch_assoc($products)) {
                                $product['quantity'] = $row['quantity'];
                                $product['price'] = ($row['quantity'] * $product['price']);
                                $cart[] = $product;
                            }
                        }
                    }
                }
            }
            if (isset($cart)) {
                return $cart;
            } else {
                return false;
            }
        }
    }

    function deleteItem($orderID, $productID)
    {
        $connection = $this->dbConnect();

        if ($connection) {
            $orderProduct = mysqli_query($connection, "SELECT orderProductID, quantity FROM Order_Product WHERE orderID = " . $orderID . " AND productID = " . $productID . " ");

            if ($orderProduct) {
                while ($row = mysqli_fetch_assoc($orderProduct)) {
                    $orderProductID = $row['orderProductID'];
                    $orderQuanity = $row['quantity'];
                }
                $deleteOrderProduct = mysqli_query($connection, "DELETE FROM Order_Product WHERE orderProductID = " . $orderProductID . " ");

                if ($deleteOrderProduct) {
                    $productPrice = mysqli_query($connection, "SELECT price FROM Product WHERE productID = " . $productID . " ");

                    if ($productPrice) {
                        while ($row = mysqli_fetch_assoc($productPrice)) {
                            $price = $row['price'];
                        }

                        $price = ($orderQuanity * $price);

                        $updateTotal = mysqli_query($connection, "UPDATE `Order` SET total = total-" . $price . " WHERE orderID = " . $orderID . " ");

                        if ($updateTotal == 1) {
                            return true;
                        } else {
                            return false;
                        }
                    }
                }
            }
        }
    }

    function updateItem($orderID, $productID, $quantity)
    {
        $connection = $this->dbConnect();

        if ($connection) {
            $orderProduct = mysqli_query($connection, "SELECT orderProductID FROM Order_Product WHERE orderID = " . $orderID . " AND productID = " . $productID . " ");

            if ($orderProduct) {
                while ($row = mysqli_fetch_assoc($orderProduct)) {
                    $orderProductID = $row['orderProductID'];
                }

                $updateQuantity = mysqli_query($connection, "UPDATE Order_Product SET quantity = " . $quantity . " WHERE orderProductID = " . $orderProductID . " ");

                if ($updateQuantity) {
                    $productPrice = mysqli_query($connection, "SELECT price FROM Product WHERE productID = " . $productID . " ");

                    if ($productPrice) {
                        while ($row = mysqli_fetch_assoc($productPrice)) {
                            $fixPrice = $row['price'];
                        }

                        $newPrice = ($quantity * $fixPrice);

                        $priceDiff = ($newPrice - $fixPrice);
                        $updateTotal = mysqli_query($connection, "UPDATE `Order` SET total = total+" . $priceDiff . " WHERE orderID = " . $orderID . " ");

                        if($updateTotal == 1){
                            return $newPrice;
                        } else {
                            return false;
                        }

                    } else {
                        return false;
                    }
                }
            }
        }
    }

    function checkOut($orderInfo, $userInfo)
    {
        $connection = $this->dbConnect();

        if ($connection) {
            for($i = 1; $i < sizeof($orderInfo); $i++){
                $availableQuantity = mysqli_query($connection, "SELECT quantity FROM Product WHERE productID = " . $orderInfo[$i]['productID'] . " ");

                if($availableQuantity){
                    while ($row = mysqli_fetch_assoc($availableQuantity)) {
                       if($row['quantity'] < $orderInfo[$i]['quantity']){
                           $lowQuantity = "lowQuantity item ".$orderInfo[$i]['name'];
                           return $lowQuantity;
                       }
                    }
                }
            }

            for($i = 1; $i < sizeof($orderInfo); $i++) {
                $updateQuantity = mysqli_query($connection, "UPDATE Product SET quantity = quantity-" . $orderInfo[$i]['quantity'] . " WHERE productID = " . $orderInfo[$i]['productID'] . " ");

                if ($updateQuantity) {
                    $query = "UPDATE `Order` SET first_name=?, last_name=?, phoneNumber=?, email=?, street=?, postcode=?, city=? , status=1 WHERE orderID=?";
                    $stmt = $connection->prepare($query);
                    $stmt->bind_param('ssdssdsd', $userInfo->firstname, $userInfo->lastname, $userInfo->phone, $userInfo->email, $userInfo->street, $userInfo->postcode, $userInfo->city, $orderInfo[0]['orderID']);
                    $stmt->execute();

                    if (empty($stmt->error)) {
                        return true;
                    } else {
                        return false;
                    }
                }
            }
        }
    }
}
