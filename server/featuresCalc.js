db.getCollection("stats").aggregate([
    /*{$unwind:"$featurId"},*/
    {$group:{_id: "$productId", feats:{$push : { feature : "$featureId", grade : 
        {$divide : ["$counters.positives",{$add:["$counters.positives", "$counters.negatives", "$counters.neutrals"]}]}} }}}
       ,{$project : {_id:1, features: "$feats"}}
    /* ,{$match : { "features" : {$elemMatch : {$and : [{feature : "1", grade : {$gt : 0.9}}, 
                {feature : "2", grade : {$gt : 0.9}}]}}}}*/
       ,{$match : {features : {$all : [ {$elemMatch : {feature : "1", grade : {$gt : 0.9}}}, 
        {$elemMatch : {feature : "2", grade : {$gt : 0.9}}}]}}},
        {$sort : {_id : -1}}
            
      
       /*,
       
    {$match : {$and : [{featureId:1}, {grade : {gte : "0.5"}}]}} ,
    */])