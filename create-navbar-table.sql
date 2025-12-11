CREATE TABLE IF NOT EXISTS `navbar_items` (
	`id` int AUTO_INCREMENT NOT NULL,
	`label` varchar(100) NOT NULL,
	`href` varchar(255) NOT NULL,
	`order` int NOT NULL DEFAULT 0,
	`parent_id` int,
	`is_button` int NOT NULL DEFAULT 0,
	`is_active` int NOT NULL DEFAULT 1,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `navbar_items_id` PRIMARY KEY(`id`)
);
