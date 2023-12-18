CREATE TABLE orders_req (
id serial PRIMARY KEY,
user_id VARCHAR(200) NOT NULL,
item_code VARCHAR(50) NOT NULL,
quantity INT NOT NULL,
payment VARCHAR(50) NOT NULL,
created_on TIMESTAMP NOT NULL,
updated_on TIMESTAMP NOT NULL
);

CREATE TABLE orders (
user_id VARCHAR(200) NOT NULL,
order_id INT UNIQUE NOT NULL,
order_status VARCHAR(50) DEFAULT 'Pending' NOT NULL,
order_details VARCHAR(200),
created_on TIMESTAMP NOT NULL,
updated_on TIMESTAMP NOT NULL,
PRIMARY KEY (user_id, order_id),
FOREIGN KEY (order_id)
    REFERENCES orders_req (id)
);