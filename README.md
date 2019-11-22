# MongoDB
learning MongoDB from official website (https://mongoosejs.com/docs/index.html)

> 基本流程 : connect -> define schema -> compile schema into model

> 概念迁移 : collection -> table , document -> record/row , schema中的属性 -> path

> 大部分CRUD操作都是异步的,需要使用 await 之后才能获取真正的数据,否则获取到的是Query对象
## 1. schema
- 用于定义 document 的属性以及行为.
- 定义的属性或行为必须在编译成model之前才能生效.
- schema将映射为 MongoDB Collection.

> 注意:行为挂载于Schema.methods(instance methods)/static(class methods)对象上即可.

## 2. model
```text
model : 通过编译schema得到model , model是一个用于构建 document 的 class.

args: 
    1.CollectionName(system change automatically) 
    2.schema
    3.use custom name
    
const UserModel = mongoose.model("user", userSchema,"user");
若数据库中某Collection已存在(即并非新创建)且连接成功后无法查询到数据,则需要手动指定第三个参数,
值以数据库中的Collection name 为准.
```
```text
model & document
一个model的实例即是一个document,model class 是 document class 的子类

保存一个model instance 到 database
1.使用 new instance({}).save(function(err){})
2.使用Static method :     
    Tank.create({ size: 'small' }, function (err, small) {
      if (err) return handleError(err);
      // saved!
    });
    
    Tank.insertMany([{ size: 'small' }], function(err) {
        
    });

每个model都有一个相关的connection,在connection没有open之前所有的操作都不会生效,
mongoose.model()会使用默认的mongoose connection完成连接.
```

## 3. virtuals
```text
virtuals 用于派生非持久化的临时属性,类似Vue中的Computed或spring boot中的@transient

personSchema.virtual('fullName').get(function () {
  return this.name.first + ' ' + this.name.last;
});

```

## 4. class static method
- 挂载于Schema.statics
- 内置的Class Static methods 返回的是Query,其可以链式调用

## 5. instance method
- 挂载于Schema.methods

## 6. Connection
```text
默认情况下,Mongoose允许立即使用所定义的Models而无需等待mongoose连接上MongoDB,
因为这将会由Mongoose buffers model function在内部调用处理.

可以通过mongoose.set('bufferCommands', false);来关闭.
```
## 7. Queries
```javascript
//static query helper for CRUD operation,return value : Query Object

//执行方式
//1.传递callback,异步执行将返回数据传参给callback函数
//所有的callback格式 : callback(err,result[s])

//2.为了方便使用返回的Query对象添加了then(callback)方法,所以有类似promise的使用形式
//注意:Mongoose Queries并不是真正的promise,不同于promise,Query.then()可以被多次分开调用

// Using query builder
Person.
find({ occupation: /host/ }).
where('name.last').equals('Ghost').
where('age').gt(17).lt(66).
where('likes').in(['vaporizing', 'talking']).
limit(10).
sort('-occupation').
select('name occupation').
exec(callback);

/**
*   过滤条件: where(pathName).logic()
    属性选择: select("pathName pathNameTwo")
    数量限定: limit(number)
    排序: sort("[-]pathName")
*/

```

## 8.middleware
> 中间件(亦称前置/后置钩子)是在异步方法执行期间被传递给控制中心的函数,
其在schema level上被指定且主要用于编写插件.

## 9.populate
> populate是一个强大的聚合操作器
```text
population是一个能自动地用其他collection中的document来替换document中指定的path的程序.

demo:
collection : person (path:p_id / stories)
collection : story (path:s_id / fans)

其中两个collection存在关系如下,
p_id/s_id : 各自collection的document的ObjectId
stories : person 喜欢的 stories , 是一个数组
fans : story 所收获的粉丝 fans , 是一个数组

在database如何存储这种关系呢?
很简单,同mysql一样,只需要建立一个映射关系即可,
将story的s_id存入person的stories数组中即可,表示该person所喜欢的故事的s_id
反之,
将person的p_id存入story的fans数组中即可,表示该story所获得的粉丝的p_id

接下来就是populate上场的时候了
当我们查询person时,其stories数组中得到只是若干个story的s_id,
当我们查询story时,其fans数组中得到只是若干个person的p_id.

如果想要在查询person时顺带将其stories中所有的story以完整的story document的形式返回,
只需要在person查询Query中添加 .populate("stories") 将指定的 path populate填充进去即可.

populate做的只不过是帮助我们发一些额外的query去查询数据并填充到最后返回的结果中而已

其实觉得很像Hibernate中的级联操作有没有?
两个相对独立的table也好,collection也罢,如果产生了某种关系,
做法都是存取对方的唯一标识(id/ObjectId)来建立一种映射而已
```
## 10.discriminator
> Discriminators是一个schema的继承机制,
它可以让你在底层的mongoDB collection的基础上,用多个交叉重叠的schema来定义复杂的model.

## 11.plugins
> 插件是一个为了能在多个schema之间重复使用逻辑的工具
