# MongoDB
learning MongoDB from official website (https://mongoosejs.com/docs/index.html)

> 基本流程 : connect -> define schema -> compile schema into model

> 大部分CRUD操作都是异步的,需要使用 await 之后才能获取真正的数据,否则获取到的可能是promise对象或Query对象
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