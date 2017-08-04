// var functions = require("./items");
// var functions1=require("./promotions");
function bestCharge(inputs) //main function
{
  let itemList=loadAllItems();
  let promotionList=loadPromotions();
  let selectItem=buildSelectItem(inputs,itemList);
  let promotionPlan=selectPromotionPlan(selectItem,promotionList);
  let inputstr=buildReport(selectItem,promotionPlan);
  return inputstr;/*TODO*/;
}
function buildSelectItem(inputs,itemList)
{ let selectItem=[];
  let num=0;
  for (let i of itemList)
  {
    for(let j of inputs )
    {
      if(i.id===j.substring(0,8))
      {
        selectItem[num]={};
        selectItem[num].id=i.id;
        selectItem[num].name=i.name;
        selectItem[num].price=i.price*parseInt(j.substring(11));
        selectItem[num].num=j.substring(11);
        num++;
      }
    }
  }
  return selectItem;
}
function selectPromotionPlan(selectItem,promotionList)
{ let num=1;
  let num1=0;
  let num2=0;//两种优惠方式节省的钱
  let select=0;//选择的优惠方式
  let summary=0;
  let promotionPlan=[];
  promotionPlan[0]={};
  for(let i of selectItem)
  {
    for(let j of promotionList[1].items)
    {
      if(i.id===j)
      {
        num2=num2+i.price/2;
        promotionPlan[num]=i.name;
        num++;
      }
    }
    summary=summary+i.price;
  }
  promotionPlan[0].summary=summary;
  num1=num1+6*parseInt((summary/30));
  if(num1>=num2&&num1!==0)
  {
    select=1;

   promotionPlan[0].promotion=num1;
   promotionPlan[0].select=select;
   return promotionPlan;
  }
  if(num1<num2&&num2!==0)
  {
    select=2;
    promotionPlan[0].promotion=num2;
    promotionPlan[0].select=select;
    return promotionPlan;
  }
  promotionPlan[0].promotion=0;
  promotionPlan[0].select=select;
  return promotionPlan;
}
function buildReport(selectItem,promotionPlan)
{
  let printstr="============= 订餐明细 =============\n";
  for(let i of selectItem)
  {
    printstr=printstr+`${i.name} x ${i.num} = ${i.price}元\n`;
  }
  printstr=printstr+"-----------------------------------\n";
  if(promotionPlan[0].select===1)
  {
    printstr=printstr+`使用优惠:
满30减6元，省${promotionPlan[0].promotion}元
-----------------------------------\n`;
  }
  if(promotionPlan[0].select===2)
  { let str='';
    for(let i=1;i<promotionPlan.length;i++)
    {
      str=str+promotionPlan[i];
      if(i!==promotionPlan.length-1)
      {
        str=str+'，';
      }
    }
    printstr=printstr+`使用优惠:
指定菜品半价(${str})，省${promotionPlan[0].promotion}元
-----------------------------------\n`;
  }
  printstr=printstr+`总计：${promotionPlan[0].summary-promotionPlan[0].promotion}元
===================================`;
  return printstr;
}



// let inputs = ["ITEM0001 x 1", "ITEM0013 x 2", "ITEM0022 x 1"];
// console.log(bestCharge(inputs));
