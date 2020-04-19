import {GraphQLServer} from 'graphql-yoga';

const Books=
[
    {
        id:`10001`,
        title:"Alice in the wonder land",
        price:10.50,
        relaeaseYear:1998,
        rating:4,
        inStock:true,
        authur:`1`

    },
    {
        id:`10002`,
        title:"Robin hood",
        price:12.50,
        relaeaseYear:2008,
        rating:5,
        inStock:true,
        authur:`1`
    },
    {
        id:`10003`,
        title:"Oliver Twist",
        price:15.50,
        relaeaseYear:2002,
        rating:3,
        inStock:true,
        authur:`2`
    },
    {
        id:`10004`,
        title:"Tin TIn",
        price:25.50,
        relaeaseYear:2004,
        rating:4,
        inStock:true,
        authur:`1`
    },
]

const Authurs=
[
    {
        id:`1`,
        name:'AJANTHAN',
        speciality:'Fictionist',
        firstPublish:2001,
        active:true
    },
    {
        id:`2`,
        name:'SHAMARAN',
        speciality:'NOVALIST',
        firstPublish:2006,
        active:true
    }

]


const Comments=
[
    {
        id:`1`,
        text:'Comment One',
        book:'10001'
    },
    {
        id:`2`,
        text:'Comment Two',
        book:'10002'
    },
    {
        id:`3`,
        text:'Comment Three',
        book:'10001'
    },
    {
        id:`4`,
        text:'Comment Four',
        book:'10003'
    },
    {
        id:`5`,
        text:'Comment Five',
        book:'10004'

    }


]


const typeDefs=`
    type Query{
       greetings(name:String):String!,
       books(query:String):[Book!]!,
       comments(query:String):[Comment!]!,
       authurs(query:String):[Authur!]!,
       add(number1:Float!, number2:Float!):Float,
       addArray(numbers:[Float!]):Float,
       grades:[Int!],
       book:Book!,
       authur:Authur!
    }  
    type Book{
        id:ID!,
        title:String!,
        price:Float!,
        relaeaseYear:Int,
        rating:Float,
        inStock:Boolean,
        authur:Authur!,
        comment:[Comment!]!
    }
    type Authur{
        id:ID!,
        name:String!,
        speciality:String!,
        firstPublish:Int,
        active:Boolean,
        books:[Book!]!
    }
    type Comment{
        id:ID!,
        text:String,
        books:[Book!]!
    }
    
`

const resolvers={
    Query:{
        greetings(parent, args, ctx, info){
            return `Hello ${args && args.name? args.name :""}`; 
        },
        books(parent, args, ctx, info){
            if(!args.query)
            {
                return Books;
            }

            return Books.filter((book)=>{
                return book.title.toLowerCase().includes(args.query.toLowerCase());
            })
        },
        comments(parent, args, ctx, info){
            if(!args.query)
            {
                return Comments;
            }

            return Comments.filter((comment)=>{
                return comment.text.toLowerCase().includes(args.query.toLowerCase());
            })
        },
        authurs(parent, args, ctx, info){
            if(!args.query)
            {
                return Authurs;
            }

            return Authurs.filter((authur)=>{
                return authur.name.toLowerCase().includes(args.query.toLowerCase());
            })
        },
        add(parent, args, ctx, info){
            return args.number1+args.number2; 
        },
        addArray(parent, args, ctx, info){
            if(args.numbers.length==0)
            {
                return 0
            };

            let total =args.numbers.reduce(
                ( accumulator, currentValue ) => accumulator + currentValue,
                0
              )

            return total; 
        },
        grades(){
            return [12,1,2];
        },
        book(){
            return {
                title:"Adventures of GraphQL",
                price:100.10,
                relaeaseYear:200,
                rating:4,
                inStock:true
            }
        },
        authur(){
            return {
                name:"Ajanthan",
                speciality:'SD',
                firstPublish:2017,
                active:true
            }
        }
    },
    Book:{
        authur(parent, args, ctx, info){
            return Authurs.find((creater)=>{
                return creater.id==parent.authur
            })
        },
    },
    Authur:{
        books(parent, args, ctx, info){
            return Books.filter((bo)=>{
                return bo.authur===parent.id
            })
        },
    },
    Comment:{
        books(parent, args, ctx, info){
            return Books.filter((bo)=>{
                return bo.id===parent.book
            })
        },
    },


}

const server=new GraphQLServer({
    typeDefs:typeDefs,
    resolvers:resolvers
})

server.start(()=>{
    console.log("The server is up and running");
})