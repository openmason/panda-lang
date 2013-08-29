# Introduction

# Pending items
 * moving json parsing into separate pegjs file

## Variables
 * any string is mushtache compliant
 * $ is the current context
 * anytime one assigns something to _, its an emit

## Lambdas

Inline functions can be written as

    f(<=0):=1;  (or) 
    f(n<=0):=1; (or)
    f(n):=n*f(n-1);

## Functions
Full scale functions can be written as 

    f(n) {
      r=[1..n];
      prod=1;
      r -> prod*=$;
      // (or)
      // r => prod*=$;
      return prod;
    }

## Data structures

### Set


## Serial, Parallel calls

### Calling with a list

    r=[1..n];
    r -> do something in sequence;
    r => do something in parallel;
    // $ is the current element from the context
    // -> sequential operator
    // => parallel operator

### Results & Assignment

    a <- [1,2,3];  // will return 1, 2, 3 
    // (equivalnt to)
    a = [1,2,3];   // easy to understand
    // (equivalent to)
    a = [1,2,3] -> _ = $;

Another example with multiple functions

    //a <- [1,2,3];  // will return 1, 2, 3 
    equivalnt to 
    a = [1,2,3]
    equivalent to
    a = [1,2,3] -> _ = $;
    
    // call x,y,z in sequence and store the result in b (order of results is as given)
    b <- [x(n),y(n),z(n)];
    // call x,r,z in parallel and store the result in c (order of result is unpredictable)
    c <= [x(3), r(33), z(99)]


## Datastructures

### Set

#### Definition

    set1 = {a, x, z}
    set1 = {23, 35...45} // use of range
    set1 = {} // empty set
    { 2, 3, 4} == { 2, 3, 3, 4} == { 4, 3, 2} 
    
    // to come back
    A = { x / x is a number bigger than 4 and smaller than 8} = { x:= >4 & <8 }
    B = { x / x is a positive number smaller than 7}
    
#### Operations
  * member (binary op - object, set)
  * Subset (Proper subset)
  * Union  
  * Intersection
  * Compliment  (Compliment of A in U)
  * Difference (Symmetric difference)
  * Cartesian product
  * Power set
  

#### Split

    numbers=[300,4,6,8];
    a,b=numbers<<2; // assign 300,4


## Rough Work

 * Basic types
   * bit
   * byte
   * with semantics
     * bool
     * int
     * real
     * char (could represent a unicode char or ascii char based on encoding)
   * data structure
     * set
     * array
     * hash
   * function
   * expression/predicate
   * array 
     * string (char array)
   * lazy list
     * list could be unbounded, only on iteration would produce result
     * unbounded ranges

 * variable
   * type, predicates, default value

 * problem is with error handling, where every if is checked
   and every result is checked for error cases 
   and every function call should check for its 
   
 * Data structure
   struct/map { ... }
   array      [ ... ]
   set        ( ... )
   node
   stack
   queue
   

* Basic spaces that the language understand
   bit
   byte
   
* support expression
* Support compiler flags direct within language

* Extended types
   char
   int
   real
   bool
   ref - ??
   
char - displayable unit, has encoding 

* object
* life
* interact

   
* range of values 123..4958, 'a'..'z'
* 1.. is a open ended range and would iterate thru max int
* fn(predicate list) := { ... ; .. .; ... } 
* fn(predicate list) := { ... , .. ., ... } 


### Probability

  * set1 x set2 (combinations)
  * permutation of an array
  
### Sequence

  * arithmetic sequence (based on sum / difference)
  * geometric sequence (based on multiplication / division)
  

### Brainstorm

    if(condition) {
      do some code
    } 
    truth value
      > logical operators (and/or/not)
      > relational operators (a > b < c)
      > arithmetic operators
    inline==true && fallback==false
    
    condition => action
    
    factorial(n) {
      int f=1;
      if(n<=1) return f;
      for(i=2;i<n;i++) f*=i;
      return n;
    }
    
    // no loop and no if ?? 
    

    // find if a string is palindrome
    // loop thru mid of the char index and do the diff
    interface boolean palindrome(string);
    palindrome:=false;
    palindrome(str.trim()==""):=false;
    palindrome(str?) {
      lToR = [0..str.length/2];
      rToL = [str.length..str.length/2];
      elemCheck:=false;
      elemCheck(char1?,char2?):=(char1==char2);
      //lToR,rToL -> str[$]!=str[$1]?return false;
      lToR,rToL => elemCheck($?str[$],$1?str[$1])?:return false;
      return true;
    }
    
    ?: ternary operator
    ? just true clause
    ?: just else clause
    
    # goal is to fire 100 requests to each of the 10 hosts at the same time
    # fetching product data
    //>>> GET :apibase/projects?from=:from&limit=:limit
    interface list getProjects(from=0,limit=100);
    
    fireRequests(n<1):=false;
    fireRequests(n) {
      r=[1..n];
      r=>getProjects();
    }
    
    # data types
    // int
    // real
    // str
    
    # unary operator ? 
    - implies - is it present (not null)

# Few minor things
  * single quote or double quote, doesn't matter
  * rest interface should be 
