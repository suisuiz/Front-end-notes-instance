/*
 * @Descripttion: sqlite 说明
 * @Author: SUI
 */
module.exports = {
  dbName: 'wuchat', // 数据库名称
  // dbPath: '_doc/wuchat.db', // 数据库地址,推荐以下划线为开头   _doc/xxx.db
  dbPath: `_doc/${uni.getStorageSync('userId')}wuchat.db`,

  // 更新dbPath
  updatePath(userId) {
    return new Promise((resolve, reject) => {
      if (userId) this.dbPath = `_doc/${userId}wuchat.db`
      resolve()
    })
  },

  // 判断数据库是否打开
  isOpen() {
    // console.log('sqlite====', this.dbPath)
    // 数据库打开了就返回 true,否则返回 false
    let open = plus.sqlite.isOpenDatabase({
      name: this.dbName, // 数据库名称
      path: this.dbPath // 数据库地址
    })
    return open
  },

  // 创建数据库 或 有该数据库就打开
  openSqlite() {
    return new Promise((resolve, reject) => {
      // 打开数据库
      plus.sqlite.openDatabase({
        name: this.dbName,
        path: this.dbPath,
        success(e) {
          resolve(e) // 成功回调
        },
        fail(e) {
          reject(e) // 失败回调
        }
      })
    })
  },

  // 关闭数据库
  closeSqlite() {
    return new Promise((resolve, reject) => {
      plus.sqlite.closeDatabase({
        name: this.dbName,
        success(e) {
          resolve(e)
        },
        fail(e) {
          reject(e)
        }
      })
    })
  },

  /**
   * @param {*} dbTable       表名 、不能用数字开头
   * @param {*} data          表头/表列、 括号里是表格的表头
   *
   * CREATE TABLE IF NOT EXISTS  如果不存在 创建表
   * 数据库建表 sql:'CREATE TABLE IF NOT EXISTS dbTable("id" varchar(50),"time" datetime,"name" TEXT)
   */
  createTable(dbTable, data) {
    return new Promise((resolve, reject) => {
      // executeSql: 执行增删改等操作的SQL语句
      plus.sqlite.executeSql({
        name: this.dbName,
        sql: `CREATE TABLE IF NOT EXISTS ${dbTable}(${data})`,
        success(e) {
          resolve(e)
        },
        fail(e) {
          reject(e)
        }
      })
    })
  },

  // 数据库删表 sql:'DROP TABLE dbTable'
  dropTable(dbTable) {
    return new Promise((resolve, reject) => {
      plus.sqlite.executeSql({
        name: this.dbName,
        sql: `DROP TABLE ${dbTable}`,
        success(e) {
          resolve(e)
        },
        fail(e) {
          reject(e)
        }
      })
    })
  },

  /**
   * @param {*} data          直接新增数据
   * @param {*} condition     具体新增数据
   *
   * 向表格里添加数据 sql:'INSERT INTO dbTable VALUES('x','x','x')'   对应新增
   * 或者 sql:'INSERT INTO dbTable ('x','x','x') VALUES('x','x','x')'   具体新增
   * 插入 INSERT INTO  、 dbTable 是表名、根据表头列名插入列值
   */
  insertTableData(dbTable, data, condition) {
    // 判断有没有传参
    if (dbTable !== undefined && data !== undefined) {
      let sql = ''
      if (condition == undefined) {
        sql = `INSERT INTO ${dbTable} VALUES('${data}')`
      } else {
        sql = `INSERT INTO ${dbTable} (${condition}) VALUES(${data})`
      }
      // console.log(sql)
      return new Promise((resolve, reject) => {
        // 表格添加数据
        plus.sqlite.executeSql({
          name: this.dbName,
          sql: sql,
          success(e) {
            resolve(e)
          },
          fail(e) {
            reject(e)
          }
        })
      })
    } else {
      return new Promise((resolve, reject) => {
        reject('错误添加')
      })
    }
  },

  /**
   * 与 insertTableData 类似
   * 根据条件向表格里添加数据  有数据更新、无数据插入
   * (建表时需要设置主键) 例如 --- "roomid" varchar(50) PRIMARY KEY
   */
  insertOrReplaceData(dbTable, data, condition) {
    // 判断有没有传参
    if (dbTable !== undefined && data !== undefined) {
      let sql = ''
      if (condition == undefined) {
        sql = `INSERT OR REPLACE INTO ${dbTable} VALUES('${data}')`
      } else {
        sql = `INSERT OR REPLACE INTO ${dbTable} (${condition}) VALUES(${data})`
      }
      // console.log(sql)
      return new Promise((resolve, reject) => {
        // 表格添加数据
        plus.sqlite.executeSql({
          name: this.dbName,
          sql: sql,
          success(e) {
            resolve(e)
          },
          fail(e) {
            reject(e)
          }
        })
      })
    } else {
      return new Promise((resolve, reject) => {
        reject('错误添加')
      })
    }
  },

  /**
   * 与 insertOrReplaceData 类似
   * 根据主键判断、有数据 不插入、反之插入
   * (建表时需要设置主键) 例如 --- "roomid" varchar(50) PRIMARY KEY
   */
  insertOrIgnoreData(dbTable, data, condition) {
    // 判断有没有传参
    if (dbTable !== undefined && data !== undefined) {
      let sql = ''
      if (condition == undefined) {
        sql = `INSERT OR IGNORE INTO ${dbTable} VALUES('${data}')`
      } else {
        sql = `INSERT OR IGNORE INTO ${dbTable} (${condition}) VALUES(${data})`
      }
      return new Promise((resolve, reject) => {
        // 表格添加数据
        plus.sqlite.executeSql({
          name: this.dbName,
          sql: sql,
          success(e) {
            // console.log(e);
            resolve(e)
          },
          fail(e) {
            // console.log(e)
            reject(e)
          }
        })
      })
    } else {
      return new Promise((resolve, reject) => {
        reject('错误添加')
      })
    }
  },

  /**
   * @param {*} lname、lname2       查询条件的列名
   * @param {*} lvalue、lvalue2     查询条件的列值
   *
   * 查询 SELECT * FROM 、WHERE 查找条件 lname,lvalue 是查询条件的列名和列值
   * 查询获取数据库里的数据 sql:'SELECT * FROM dbTable WHERE lname = 'lvalue''
   */
  selectTableData(dbTable, lname, lvalue, lname2, lvalue2, lname3, lvalue3) {
    if (dbTable !== undefined) {
      let sql = `SELECT * FROM ${dbTable}`
      if (lname !== undefined) {
        sql += ` WHERE ${lname} = '${lvalue}'`
        if (lname2 !== undefined) {
          sql += ` AND ${lname2} = '${lvalue2}'`
          if (lname3) {
            sql += ` AND ${lname3} = '${lvalue3}'`
          }
        }
      }
      // console.log(sql)
      return new Promise((resolve, reject) => {
        // 表格查询数据  执行查询的SQL语句
        plus.sqlite.selectSql({
          name: this.dbName,
          sql: sql,
          success(e) {
            resolve(e)
          },
          fail(e) {
            reject(e)
          }
        })
      })
    } else {
      return new Promise((resolve, reject) => {
        reject('错误查询')
      })
    }
  },

  /**
   * @param {*} column_name    新增的列名
   * @param {*} data_type      新增列类型
   *
   * ALTER TABLE table_name ADD COLUMN column_name data_type
   * 改数据库表、新增一列  sql:'ALTER TABLE users ADD COLUMN address TEXT;'
   */
  insertTableColumn(dbTable, column_name, data_type) {
    // ALTER TABLE table_name ADD COLUMN column_name data_type
    if (dbTable !== undefined) {
      let sql = `ALTER TABLE ${dbTable} ADD COLUMN ${column_name} ${data_type}`
      // console.log(sql)
      return new Promise((resolve, reject) => {
        // 表格查询数据  执行查询的SQL语句
        plus.sqlite.selectSql({
          name: this.dbName,
          sql: sql,
          success(e) {
            resolve(e)
          },
          fail(e) {
            reject(e)
          }
        })
      })
    } else {
      return new Promise((resolve, reject) => {
        reject('错误查询')
      })
    }
  },

  // 查询 chatlist 数据 排序 根据 stick、time 倒序
  selectChatList() {
    let sql = `SELECT * FROM chatlist order by stick desc,time desc`
    return new Promise((resolve, reject) => {
      // 表格查询数据  执行查询的SQL语句
      plus.sqlite.selectSql({
        name: this.dbName,
        sql: sql,
        success(e) {
          resolve(e)
        },
        fail(e) {
          console.log(e)
          reject(e)
        }
      })
    })
  },

  // 模糊查询
  queryTableData(dbTable, lname, lvalue) {
    let sql = `SELECT * FROM ${dbTable} WHERE ${lname}  LIKE '%${lvalue}%';`
    // console.log(sql)
    return new Promise((resolve, reject) => {
      // 表格查询数据  执行查询的SQL语句
      plus.sqlite.selectSql({
        name: this.dbName,
        sql: sql,
        success(e) {
          resolve(e)
        },
        fail(e) {
          console.log(e)
          reject(e)
        }
      })
    })
  },

  /**
   * @param {*} lname、lname2       删除条件的列名
   * @param {*} lvalue、lvalue2     删除条件的列值
   *
   * 删除 DELETE FROM
   * 删除表里的数据 sql:'DELETE FROM dbTable WHERE lname = 'lvalue''
   */
  deleteTableData(dbTable, lname, lvalue, lname2, lvalue2) {
    if (dbTable !== undefined) {
      let sql = ''
      if (lname == undefined) {
        sql = `DELETE FROM ${dbTable}`
      } else {
        if (lname2 !== undefined) {
          // 两个检索条件
          sql = `DELETE FROM ${dbTable} WHERE ${lname} = '${lvalue}' AND ${lname2} = '${lvalue2}'`
        } else {
          // 一个检索条件
          sql = `DELETE FROM ${dbTable} WHERE ${lname} = '${lvalue}'`
        }
      }
      return new Promise((resolve, reject) => {
        // 删除表数据
        plus.sqlite.executeSql({
          name: this.dbName,
          sql: sql,
          success(e) {
            resolve(e)
          },
          fail(e) {
            reject(e)
          }
        })
      })
    } else {
      return new Promise((resolve, reject) => {
        reject('错误删除')
      })
    }
  },

  /**
   * @param {*} data                要修改的列名=修改后列值
   * @param {*} lname、lname2       修改条件的列名
   * @param {*} lvalue、lvalue2     修改条件的列值
   *
   * 修改 UPDATE
   * 修改数据表里的数据 sql:"UPDATE dbTable SET 列名 = '列值',列名 = '列值' WHERE lname = 'lvalue'"
   */
  updateTableData(dbTable, data, lname, lvalue, lname2, lvalue2, lname3, lvalue3) {
    if (dbTable !== undefined) {
      let sql = `UPDATE ${dbTable} SET ${data}`
      if (lname !== undefined) {
        sql += ` WHERE ${lname} = '${lvalue}'`
        if (lname2 !== undefined) {
          sql += ` AND ${lname2} = '${lvalue2}'`
          if (lname3) {
            sql += ` AND ${lname3} = '${lvalue3}'`
          }
        }
      }
      // WHERE 前面是要修改的列名、列值，后面是条件的列名、列值
      return new Promise((resolve, reject) => {
        // 修改表数据
        plus.sqlite.executeSql({
          name: this.dbName,
          sql: sql,
          success(e) {
            resolve(e)
          },
          fail(e) {
            reject(e)
          }
        })
      })
    } else {
      return new Promise((resolve, reject) => {
        reject('错误更新')
      })
    }
  },

  /**
   * @param {*} sort_condition        排序的条件
   * @param {*} num       跳过 num 条数据  分页动态值   例 num 为 0，就从最后的数据开始拿xx条
   *
   * 排序 -- 默认正序  ORDER BY
   * 升序 -- 正序   ASC
   * 降序 -- 倒序   DESC  --  从最后一条数据开始拿
   * LIMIT 15 OFFSET '${num}',这句的意思是跳过 num 条拿 15 条数据, num 为跳过多少条数据是动态值
   *
   * 获取指定数据条数  sql:"SELECT * FROM dbTable ORDER BY 'sort_condition' DESC LIMIT 15 OFFSET 'num'"
   */
  orderBySQL(dbTable, lname, lvalue, sort_condition, num = 0, limit_num = 15) {
    // SELECT * FROM dbTable WHERE condition ORDER BY column1  ASC | DESC LIMIT 15 OFFSET ''
    if (dbTable !== undefined) {
      let sql = ''
      if (lname == undefined) {
        sql = `SELECT * FROM ${dbTable} ORDER BY '${sort_condition}' DESC LIMIT ${limit_num} OFFSET ${num}`
      } else {
        sql = `SELECT * FROM ${dbTable} WHERE ${lname} = '${lvalue}' ORDER BY ${sort_condition} DESC LIMIT ${limit_num} OFFSET ${num}`
      }
      // console.log(sql);
      return new Promise((resolve, reject) => {
        plus.sqlite.selectSql({
          name: this.dbName,
          sql: sql,
          success(e) {
            // console.log(e);
            resolve(e)
          },
          fail(e) {
            reject(e)
          }
        })
      })
    } else {
      return new Promise((resolve, reject) => {
        reject('错误查询')
      })
    }
  }
}
