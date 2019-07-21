| ------------------------------------------------------------------------------------------------------ |
|																										 |
| **************************** Handling nodejs with mongodb database *********************************** |
|																										 |
| ------------------------------------------------------------------------------------------------------ |
|
|	* Cai dat mongodb va set duong dan den thu muc chua database
|	*	-> mongod --dbpath /User/tungnguyen/Document/lib/mongo/datbase
|
|
|	* Connect to mongodb
|	*	-> Run mongod --dbpath /User/tungnguyen/Document/lib/mongo/datbase de start server mongodb
|	*	-> Run mongo de connect den server
|
|
|	* ------------- Cac lenh co ban ------------------------------------------- *
|	|	show dbs; : show datbases												|
|	|	use db;	  : use database												|
|	|	show collections: show database co nhung collection nao 				|
|	|	db.createCollection('test') : Tao collection test						|
|	|	db.test.find(): show tat ca cac document co trong collection test		|
|	|	db.test.insert({name: 'tung', age: 15}): Tao Document 					|
|	|	db.test.update({DK}, {update}) : update 								|
|	|	db.test.update({Dk}, {$set: {update}}) : update giu lai cac truong cu 	|
|	|	db.test.remove({dk}): remove											|