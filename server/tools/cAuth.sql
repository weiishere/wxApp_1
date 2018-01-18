

SET NAMES utf8;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
--  Table structure for `cSessionInfo`
-- ----------------------------
DROP TABLE IF EXISTS `cSessionInfo`;
CREATE TABLE `cSessionInfo` (
  `open_id` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `uuid` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `skey` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `last_visit_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `session_key` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_info` varchar(2048) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`open_id`),
  KEY `openid` (`open_id`) USING BTREE,
  KEY `skey` (`skey`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='会话管理用户信息';


DROP TABLE IF EXISTS `banners`;
CREATE TABLE `banners` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `imageUrl` varchar(500) NOT NULL,
  `title` varchar(500) NOT NULL,
  `article` text NOT NULL,
  `createDate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) 
)ENGINE=MyISAM  DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='banner信息';

DROP TABLE IF EXISTS `menu`;
CREATE TABLE `benu` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(500) NOT NULL,
  `icon` varchar(20) NOT NULL,
  `parentId` int(11) NOT NULL DEFAULT 0,
  `type` varchar(30) NOT NULL DEFAULT 'category',
  `createDate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) 
)ENGINE=MyISAM  DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Menu信息';
insert into `menu` (`name`,`icon`) values 
('店主推荐', 'home'),('最新上架', 'new'),('护肤美妆', 'brand-makeup'),
('首饰精品', 'jewelry'),('母婴喂养', 'baby1'),('其他精品', 'Recommend');

DROP TABLE IF EXISTS `goods`;
CREATE TABLE `goods` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(500) NOT NULL,
  `category` varchar(11) NOT NULL,
  `mainImage` varchar(500) NOT NULL,
  `price` varchar(100) NOT NULL,
  `discount` FLOAT NOT NULL DEFAULT 1,
  `unit` varchar(50) NOT NULL,
  `remark` varchar(800) NULL,
  `storage` varchar(50) NULL,
  `introImage`  varchar(1000) NULL,
  `introduction`  text NULL,
  `status` int(11) NOT NULL DEFAULT '1',
  `createDate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) 
)ENGINE=MyISAM  DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='商品信息';

SET FOREIGN_KEY_CHECKS = 1;
