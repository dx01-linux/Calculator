# Calculator

1) mobile & pc style implemented relaing on device's screen's width
2) perform basic operation
3) can handle porcent and floats 
4) can erase ecuation
5) operation book implemented for pc only



js :
    -resVar : it take care of showing equations parts & performing changes on them
    -keyboard : it hold all keys'type's event handlers
    -opertionBook : it take care of storage operation performed and manage them by adding more or erasing  existing ones

    *events:
       - keyboard   //listener:
            add number  
            add operator
            triggering operation 
            operators buttons 
        - operationBook //listener:
            restore old operation in Operation book
            remove all operations in Operation Book
