// ===== Quiz: 10 card, 5 opzioni ciascuna (single-choice) =====
// Mostra una card per volta; la successiva appare dopo la selezione.
// Soglia finale: una categoria vince se ha > 2 selezioni (almeno 3).
// Mini avanzamento: riga di 10 puntini sotto al titolo card. Nessun pulsante "Mescola".

(function(){
  const CATEGORIES = {
    mano:   { label: "✋ Mano – Servitore Pratico" },
    bocca:  { label: "🗣️ Bocca – Comunicatore e Incoraggiatore" },
    orecchio:{ label: "👂 Orecchio – Ascoltatore e Consolatore" },
    piede:  { label: "🦶 Piede – Motore e Messaggero" },
    cuore:  { label: "❤️ Cuore – Intercessore Compassionevole" },
    occhio: { label: "👁️ Occhio – Vigile e Discernitore" },
  };

  const QUESTIONS = [
    "Entri a un evento in chiesa e noti qualcuno seduto da solo. Cosa fai?",
    "Un amico sta lottando con una decisione difficile. Qual è il tuo primo istinto?",
    "Durante il momento di preghiera di gruppo, di solito tu…",
    "Ti chiedono di unirti a un servizio. Quale ruolo ti rappresenta di più?",
    "Quando nasce una nuova idea o un problema, tu dici…",
    "Durante un ritiro della chiesa, il responsabile chiede volontari. Tu pensi subito…",
    "Scopri che qualcuno della che conosci è malato. Cosa fai per prima cosa?",
    "Sta per iniziare una funzione in chiesa. Ti senti più portato a…?",
    "Stai preparando una giornata di servizio per il gruppo giovani. Il tuo punto di forza è…",
    "La messa è in ritardo. Tendi a…",
  ];

  // Contenuti descrittivi del risultato per ciascun archetipo
  const RESULT_CONTENT = {
    bocca: `
      <h2>🗣️ LA BOCCA — Il Comunicatore e l’Incoraggiatore</h2>
      <p>Le parole sono il tuo dono — e la tua chiamata. Ami insegnare, predicare, spiegare e ispirare. Dici la verità, incoraggi gli altri e spesso hai un messaggio che arde nel tuo cuore.</p>
      <h3>Punti di forza:</h3>
      <ul>
        <li>Ispira gli altri attraverso la parola</li>
        <li>Chiaro comunicatore della verità</li>
        <li>Incoraggia, insegna o guida</li>
        <li>Aiuta a dare linguaggio alla fede delle persone</li>
      </ul>
      <h3>Debolezze:</h3>
      <ul>
        <li>Può dominare le conversazioni</li>
        <li>Può avere difficoltà ad ascoltare bene</li>
        <li>Rischia di parlare troppo in fretta o con durezza</li>
        <li>Ha bisogno di umiltà per equilibrare la propria voce</li>
      </ul>
      <p><strong>Esempio di santo:</strong> San Pietro Apostolo</p>
    `,
    orecchio: `
      <h2>👂 L’ORECCHIO — L’Ascoltatore e il Consolatore</h2>
      <p>Sei la persona con cui gli altri si sentono a proprio agio nel parlare. Non ti affretti a risolvere o a parlare — semplicemente ascolti. Offri un dono raro: silenzio, presenza e profondo sostegno emotivo.</p>
      <h3>Punti di forza:</h3>
      <ul>
        <li>Paziente e degno di fiducia</li>
        <li>Crea spazio per l’autenticità degli altri</li>
        <li>Emotivamente sicuro e di supporto</li>
        <li>Eccellente nelle relazioni individuali</li>
      </ul>
      <h3>Debolezze:</h3>
      <ul>
        <li>Può assorbire troppo peso emotivo</li>
        <li>Può diventare passivo o tacere quando servirebbe parlare</li>
        <li>Fa fatica a difendere se stesso</li>
        <li>Ha bisogno di confini chiari per restare equilibrato</li>
      </ul>
      <p><strong>Esempio di santa:</strong> Maria, sorella di Marta e Lazzaro</p>
    `,
    piede: `
      <h2>🦶 IL PIEDE — Il Messaggero e il Portatore di Movimento</h2>
      <p>Sei un realizzatore. Ami l’azione, il movimento e la missione. Che si tratti di raggiungere nuove persone o di iniziare qualcosa di nuovo, sei mosso dal desiderio di avere un impatto.</p>
      <h3>Punti di forza:</h3>
      <ul>
        <li>Coraggioso ed energico</li>
        <li>Guidato da visione e scopo</li>
        <li>Bravo a mobilitare gli altri</li>
        <li>Disposto ad andare dove altri non vanno</li>
      </ul>
      <h3>Debolezze:</h3>
      <ul>
        <li>Può agire senza riflettere abbastanza</li>
        <li>Può diventare impaziente o irrequieto</li>
        <li>Può sottovalutare i ruoli più lenti o silenziosi</li>
        <li>Ha bisogno di ancorarsi alla disciplina spirituale</li>
      </ul>
      <p><strong>Esempio di santo:</strong> San Paolo Apostolo</p>
    `,
    cuore: `
      <h2>❤️ IL CUORE — Il Compassionevole e l’Intercessore</h2>
      <p>Senti profondamente. Porti gli altri nella preghiera, nell’amore e nella quiete. Sei spesso mosso alle lacrime per gli altri e hai una grande capacità di confortare e prenderti cura. Le persone si sentono al sicuro con te.</p>
      <h3>Punti di forza:</h3>
      <ul>
        <li>Empatico e sensibile</li>
        <li>Potente nella preghiera d’intercessione</li>
        <li>Crea un’atmosfera di sicurezza e guarigione</li>
        <li>Mosso da amore e misericordia</li>
      </ul>
      <h3>Debolezze:</h3>
      <ul>
        <li>Può sentirsi sopraffatto emotivamente</li>
        <li>Può assumersi pesi che non gli appartengono</li>
        <li>Può avere difficoltà a stabilire confini sani</li>
        <li>Ha bisogno di un costante rinnovamento spirituale</li>
      </ul>
      <p><strong>Esempio di santo:</strong> San Giovanni, il Discepolo Amato</p>
    `,
    occhio: `
      <h2>👁️ L’OCCHIO — Il Vigile e il Perspicace</h2>
      <p>Hai sensibilità e discernimento spirituale. Noti ciò che gli altri non vedono — emozioni nascoste, pericoli, potenziale inespresso. Spesso guidi gli altri con saggezza e intuizione spirituale.</p>
      <h3>Punti di forza:</h3>
      <ul>
        <li>Discernimento spirituale</li>
        <li>Attento e consapevole della visione d’insieme</li>
        <li>Aiuta gli altri a vedere chiaramente nella confusione</li>
      </ul>
      <h3>Debolezze:</h3>
      <ul>
        <li>Può sembrare critico o troppo analitico</li>
        <li>Può sentirsi isolato o frainteso</li>
        <li>Rischia l’orgoglio nel “vedere più degli altri”</li>
        <li>Può esitare ad agire, aspettando troppa chiarezza</li>
      </ul>
      <p><strong>Esempio di santo:</strong> San Giuseppe</p>
    `,
    mano: `
      <h2>✋ LA MANO — Il Servitore Pratico</h2>
      <p>Sei affidabile, laborioso e concreto. Ami servire gli altri in modo silenzioso ed efficiente. Potresti agire dietro le quinte, ma nulla funzionerebbe senza di te.</p>
      <h3>Punti di forza:</h3>
      <ul>
        <li>Affidabile e degno di fiducia</li>
        <li>Disponibile ad aiutare in ogni modo</li>
        <li>Realizza visioni e piani</li>
        <li>Mantiene la squadra o la chiesa in funzione armoniosa</li>
      </ul>
      <h3>Debolezze:</h3>
      <ul>
        <li>Può sentirsi trascurato o non apprezzato</li>
        <li>Può esaurirsi per troppo lavoro</li>
        <li>Può avere difficoltà a dire “no”</li>
        <li>Può dare priorità al fare piuttosto che all’essere</li>
      </ul>
      <p><strong>Esempio di santa:</strong> Santa Marta</p>
    `,
  };

  // ====== I18N (Arabic - Egypt) ======
  const UI_IT = {
    pageTitle: '🔎 Scopri il tuo dono',
    h1: '🔎 Scopri il tuo dono',
    submit: '✅ Scopri il risultato',
    error: '⚠️ Per favore rispondi a tutte le situazioni.'
  };
  const UI_AR = {
    pageTitle: 'اكتشف عطيتك 🔎',
    h1: 'اكتشف عطيتك 🔎',
    submit: 'اعرف النتيجة ✅',
    error: '⚠️ من فضلك جاوب على كل المواقف.'
  };

  const CATEGORIES_AR = {
    mano:   { label: '✋ اليد - خادم عملي' },
    bocca:  { label: '🗣️ الفم - متحدث ومشجّع' },
    orecchio:{ label: '👂 الأذن - مستمع ومُعزٍ' },
    piede:  { label: '🦶 القدم - محرّك ورسول' },
    cuore:  { label: '❤️ القلب - شفيع رحيم' },
    occhio: { label: '👁️ العين - يقِظ ومميِّز' },
  };

  // Ensure category labels show emojis for both languages
  try{
    CATEGORIES.mano.label    = '✋ Mano - Servitore Pratico';
    CATEGORIES.bocca.label   = '🗣️ Bocca - Comunicatore e Incoraggiatore';
    CATEGORIES.orecchio.label= '👂 Orecchio - Ascoltatore e Consolatore';
    CATEGORIES.piede.label   = '🦶 Piede - Motore e Messaggero';
    CATEGORIES.cuore.label   = '❤️ Cuore - Intercessore Compassionevole';
    CATEGORIES.occhio.label  = '👁️ Occhio - Vigile e Discernitore';
  }catch(e){}

  try{
    CATEGORIES_AR.mano.label    = '✋ اليد - الخادم العملي';
    CATEGORIES_AR.bocca.label   = '🗣️ الفم - المتحدث والمُشجّع';
    CATEGORIES_AR.orecchio.label= '👂 الأذن - المستمع والمُعزّي';
    CATEGORIES_AR.piede.label   = '🦶 القدم - المحرّك والرسول';
    CATEGORIES_AR.cuore.label   = '❤️ القلب - الشفيع الرحيم';
    CATEGORIES_AR.occhio.label  = '👁️ العين - اليقِظ والمميِّز';
  }catch(e){}

  const QUESTIONS_AR = [
    'تدخل فعالية في الكنيسة وتلاحظ شخصاً يجلس منفرداً. ماذا تفعل؟',
    'صديق لك يواجه قراراً صعباً. ما هو أول رد فعل لديك؟',
    'أثناء صلاة الجماعة، عادةً ما...',
    'يطلبون منك الانضمام إلى خدمة. أي دور يمثّلك أكثر؟',
    'عندما تظهر فكرة جديدة أو مشكلة، أنت تقول...',
    'خلال خلوة الكنيسة، يطلب المسؤول متطوّعين. تفكر فوراً بـ...',
    'تكتشف أن أحد أفراد عائلتك مريض. ما أول شيء تفعله؟',
    'على وشك أن تبدأ فعالية في الكنيسة. تميل أكثر إلى...؟',
    'تستعد ليوم خدمة لمجموعة الشباب. نقطة قوتك هي...',
    'الخدمة متأخرة. تميل إلى...'
  ];

  // Emoji questions (IT & AR)
  const QUESTIONS_IT_EMOJI = [
    "🎉 Entri a un evento in chiesa e noti qualcuno seduto da solo. Cosa fai?",
    "🤝 Un amico sta affrontando una decisione difficile. Qual è la tua prima reazione?",
    "🙏 Durante il momento di preghiera di gruppo, di solito tu…",
    "🧩 Ti chiedono di partecipare a un servizio. Quale ruolo ti rappresenta di più?",
    "💡 Davanti a una nuova idea o a un problema, di solito dici…",
    "🙋‍♀️ Durante un ritiro in chiesa, il responsabile chiede volontari. Il tuo primo pensiero è…",
    "🏥 Scopri che un familiare è malato. Qual è la prima cosa che fai?",
    "⛪ Sta per iniziare una funzione in chiesa. Ti senti più portato a…?",
    "🛠️ Stai organizzando una giornata di servizio per i giovani. Il tuo punto di forza è…",
    "⏳ La messa è in ritardo. Tendi a…",
  ];

  const QUESTIONS_AR_EMOJI = [
    '🎉 تدخل فعالية في الكنيسة وتلاحظ شخصاً يجلس وحده. ماذا تفعل؟',
    '🤝 صديقك يواجه قراراً صعباً. ما أول رد فعل لديك؟',
    '🙏 أثناء صلاة الجماعة، عادةً ما تفعل...',
    '🧩 يُطلب منك المشاركة في خدمة. أي دور يناسبك أكثر؟',
    '💡 عند ظهور فكرة جديدة أو مشكلة، عادةً تقول...',
    '🙋‍♀️ في خلوة كنسية، يطلب المسؤول متطوعين. ما أول ما تفكر فيه؟',
    '🏥 تكتشف أن أحد أفراد عائلتك مريض. ما أول شيء تفعله؟',
    '⛪ فعالية كنسية على وشك أن تبدأ. تميل أكثر إلى...؟',
    '🛠️ تُحضّر ليوم خدمة مع مجموعة الشباب. ما هي نقطة قوتك؟',
    '⏳ الخدمة تأخرت. تميل إلى أن...',
  ];

  const ANSWERS_AR = [
    // MANO
    { cat:'mano', text:'أفكر في كيفية تنظيم الحدث وأعرض المساعدة.' },
    { cat:'mano', text:'أفكر في من سيحتاج إلى مساعدة بعد الصلاة.' },
    { cat:'mano', text:'فريق المشتريات.' },
    { cat:'mano', text:'التقنية أو الإعلام.' },
    { cat:'mano', text:'فريق التركيب/الفك والتنظيف.' },
    { cat:'mano', text:'لنحلّ المشكلة فوراً.' },
    { cat:'mano', text:'سأساعد في المطبخ أو التنظيف — أي شيء يلزم.' },
    { cat:'mano', text:'أحضر طعاماً أو أقوم بالمشاوير اللازمة.' },
    { cat:'mano', text:'أساعد في ترتيب الكراسي أو نظام الصوت.' },
    { cat:'mano', text:'أنظّم الأمور اللوجستية وأتأكد أن كل شيء يسير بسلاسة.' },
    { cat:'mano', text:'أساعد عملياً لتسريع الأمور.' },

    // BOCCA
    { cat:'bocca', text:'أبدأ محادثة ودّية وآمنة.' },
    { cat:'bocca', text:'أشارك قصتي لمساعدته/ها على التفاعل.' },
    { cat:'bocca', text:'أشجّعه/ها بكلمة من الكتاب أو بنصيحة.' },
    { cat:'bocca', text:'أصلّي بشجاعة وأقود الصلاة.' },
    { cat:'bocca', text:'الاستقبال/الضيافة.' },
    { cat:'bocca', text:'التعليم أو القيادة أو التحدّث.' },
    { cat:'bocca', text:'نعلّم أو نقول الحقيقة لمساعدة الآخرين.' },
    { cat:'bocca', text:'أريد قيادة درس الكتاب.' },
    { cat:'bocca', text:'أرسل رسالة صوتية أو نصية للتشجيع.' },
    { cat:'bocca', text:'أتأكد أن القادمين الجدد يشعرون بالترحيب.' },
    { cat:'bocca', text:'أستعد للكلام أو الترنيم أو القيادة.' },
    { cat:'bocca', text:'إلقاء كلمة تحفيزية قبل البدء.' },
    { cat:'bocca', text:'أقدّم خاتمة مفرِحة أو حكيمة.' },

    // ORECCHIO
    { cat:'orecchio', text:'أجلس معه/معها بصمت وأستمع.' },
    { cat:'orecchio', text:'أستمع فقط وأتركه/أتركها يعبّر/تعبّر.' },
    { cat:'orecchio', text:'أستمع وأصلّي بصمت.' },
    { cat:'orecchio', text:'دعونا نسمع كيف يشعر الناس تجاه ذلك.' },
    { cat:'orecchio', text:'سأستمع لمن يحتاج للكلام خلال الاستراحات.' },
    { cat:'orecchio', text:'أتصل به/بها أو أزوره/أزورها فقط للاستماع.' },
    { cat:'orecchio', text:'أجلس في الخلف وألاحظ أين يحتاج الناس إلى مساعدة.' },
    { cat:'orecchio', text:'أتواصل بشكل فردي مع الخجولين أو المجروحين.' },
    { cat:'orecchio', text:'أبقى لأتحدث مع من يحتاج ذلك.' },

    // PIEDE
    { cat:'piede', text:'أعرّفه/أعرّفها على الآخرين وأضمّه/أضمّها للمجموعة.' },
    { cat:'piede', text:'أساعده/أساعدها على وضع خطة أو البدء بالفعل.' },
    { cat:'piede', text:'أقوم بميتانيا كلما استطعت.' },
    { cat:'piede', text:'لنذهب لنعمل شيئاً حيال ذلك.' },
    { cat:'piede', text:'أذهب لدعوة من لم يكن ينوي الحضور.' },
    { cat:'piede', text:'أجمع آخرين لزيارته/ها أو لمساعدته/ها.' },
    { cat:'piede', text:'أخرج لتحية المتأخرين أو دعوة المارّين.' },
    { cat:'piede', text:'أقود الخروج/الكرازة أو أذهب للحديث مع الناس.' },
    { cat:'piede', text:'أمرّ على الفرق الأخرى وأعرض المساعدة.' },

    // CUORE
    { cat:'cuore', text:'أصلّي له/لها بصمت من بعيد.' },
    { cat:'cuore', text:'أصلّي معه/معها فوراً.' },
    { cat:'cuore', text:'أتأثر أو أشعر بالاتصال العميق باحتياجات الآخرين.' },
    { cat:'cuore', text:'الصلاة.' },
    { cat:'cuore', text:'لنُصلِّ أولاً.' },
    { cat:'cuore', text:'سأصلّي بصمت للجميع خلال الخلوة.' },
    { cat:'cuore', text:'أصلّي فوراً لأجل شفائه/شفائها.' },
    { cat:'cuore', text:'أجد ركناً هادئاً للصلاة من أجل المشاركين.' },
    { cat:'cuore', text:'أصلّي لكي يملأ حضور الله اليوم.' },
    { cat:'cuore', text:'أصلّي بصمت من أجل السلام والصبر.' },

    // OCCHIO
    { cat:'occhio', text:'أراقب من بعيد وأشعر أن هناك أمراً أعمق.' },
    { cat:'occhio', text:'ألتقط مشاعره/مشاعرها دون كلمات كثيرة.' },
    { cat:'occhio', text:'أبقى يقظاً روحياً لما يحدث.' },
    { cat:'occhio', text:'سوف نفهم ما الذي يحدث فعلاً.' },
    { cat:'occhio', text:'أبقى في الخلف لأراقب ما يجري.' },
    { cat:'occhio', text:'أراقب بصمت لأفهم ما هي الاحتياجات العملية الحقيقية.' },
    { cat:'occhio', text:'أميّز ما يحتاجه الناس حتى إن لم يقولوا ذلك.' },
    { cat:'occhio', text:'أراقب لأفهم سبب حدوث التأخيرات.' },
  ];

  const RESULT_CONTENT_AR = {
    bocca: `
      <h2>🗣️ الفم - المتحدث والمُشجِّع</h2>
      <p>الكلمات هي عطيتك ورسالتك. تحب أن تعلّم وتبشّر وتشرح وتُلهم. تقول الحق، وتشجّع الآخرين، وغالباً ما تحمل رسالة مشتعلة في قلبك.</p>
      <h3>💪 نقاط القوة:</h3>
      <ul>
        <li>إلهام الآخرين بالكلمة</li>
        <li>تواصل واضح للحق</li>
        <li>تشجيع وتعليم وقيادة</li>
        <li>تمنح الناس لغة يعبّرون بها عن إيمانهم</li>
      </ul>
      <h3>⚠️ نقاط الضعف:</h3>
      <ul>
        <li>قد تسيطر على الحوار</li>
        <li>قد تجد صعوبة في الاستماع جيداً</li>
        <li>خطر الإسراع في الكلام أو القسوة</li>
        <li>تحتاج إلى التواضع لموازنة صوتك</li>
      </ul>
      <p><strong>🕊️ مثال قديس:</strong> القديس بطرس الرسول</p>
    `,
    orecchio: `
      <h2>👂 الأذن - المستمع والمُعزّي</h2>
      <p>أنت الشخص الذي يرتاح الآخرون للحديث معه. لا تتعجل في الحلول أو الكلام — بل تستمع ببساطة. تقدّم عطية نادرة: الصمت والحضور والدعم العاطفي العميق.</p>
      <h3>💪 نقاط القوة:</h3>
      <ul>
        <li>صبور وجدير بالثقة</li>
        <li>يخلق مساحة لأصالة الآخرين</li>
        <li>آمن عاطفياً وداعم</li>
        <li>ممتاز في العلاقات الفردية</li>
      </ul>
      <h3>⚠️ نقاط الضعف:</h3>
      <ul>
        <li>قد يمتص وزناً عاطفياً زائداً</li>
        <li>قد يصبح سلبياً أو يصمت حين يلزم الكلام</li>
        <li>يصعب عليه الدفاع عن نفسه</li>
        <li>يحتاج إلى حدود واضحة ليبقى متوازناً</li>
      </ul>
      <p><strong>🕊️ مثال قديسة:</strong> مريم أخت مرتا ولعازر</p>
    `,
    piede: `
      <h2>🦶 القدم - الرسول ومحرك الحركة</h2>
      <p>أنت منجز. تحب الحركة والعمل والرسالة. سواء في الوصول إلى أشخاص جدد أو بدء شيء جديد، تدفعك الرغبة في التأثير.</p>
      <h3>💪 نقاط القوة:</h3>
      <ul>
        <li>شجاع ومفعم بالطاقة</li>
        <li>مدفوع بالرؤية والغاية</li>
        <li>بارع في تعبئة الآخرين</li>
        <li>مستعد للذهاب حيث لا يذهب الآخرون</li>
      </ul>
      <h3>⚠️ نقاط الضعف:</h3>
      <ul>
        <li>قد يتصرف دون قدر كافٍ من التأمل</li>
        <li>قد يصبح غير صبور أو قلق</li>
        <li>قد يستهين بالأدوار الأبطأ أو الصامتة</li>
        <li>بحاجة إلى الارتساء بالانضباط الروحي</li>
      </ul>
      <p><strong>🕊️ مثال قديس:</strong> القديس بولس الرسول</p>
    `,
    cuore: `
      <h2>❤️ القلب - الشفيع الرحيم</h2>
      <p>تشعر بعمق. تحمل الآخرين في الصلاة والمحبة والهدوء. كثيراً ما تتحرك بالدموع من أجل الآخرين ولديك قدرة كبيرة على التعزية والاعتناء. الناس يشعرون بالأمان معك.</p>
      <h3>💪 نقاط القوة:</h3>
      <ul>
        <li>متعاطف وحسّاس</li>
        <li>قوي في صلاة الشفاعة</li>
        <li>يخلق جواً من الأمان والشفاء</li>
        <li>مدفوع بالمحبة والرحمة</li>
      </ul>
      <h3>⚠️ نقاط الضعف:</h3>
      <ul>
        <li>قد يشعر بالإرهاق العاطفي</li>
        <li>قد يجد صعوبة في وضع حدود</li>
        <li>قد يحمل أثقالاً لا تخصّه</li>
        <li>يحتاج إلى رعاية ذاته والراحة</li>
      </ul>
      <p><strong>🕊️ مثال قديس:</strong> القديس يوسف</p>
    `,
    mano: `
      <h2>✋ اليد - الخادم العملي</h2>
      <p>موثوق ومجتهد وعملي. تحب خدمة الآخرين بصمت وبكفاءة. قد تعمل خلف الكواليس، لكن لا شيء يعمل من دونك.</p>
      <h3>💪 نقاط القوة:</h3>
      <ul>
        <li>موثوق وجدير بالثقة</li>
        <li>مستعد للمساعدة بأي طريقة</li>
        <li>يحقق الرؤى والخطط</li>
        <li>يبقي الفريق أو الكنيسة تعمل بانسجام</li>
      </ul>
      <h3>⚠️ نقاط الضعف:</h3>
      <ul>
        <li>قد يشعر بأنه مُهمَل أو غير مُقدّر</li>
        <li>قد ينهك من كثرة العمل</li>
        <li>قد يجد صعوبة في قول «لا»</li>
        <li>قد يقدّم العمل على الكينونة</li>
      </ul>
      <p><strong>🕊️ مثال قديسة:</strong> القديسة مرتا</p>
    `,
  };

  // Current language state + helpers
  let CURRENT_LANG = (typeof localStorage !== 'undefined' && localStorage.getItem('lang')) || 'it';
  function getLang(){ return CURRENT_LANG; }
  function t(key){ return (CURRENT_LANG === 'ar' ? UI_AR : UI_IT)[key] || ''; }
  function getCategories(){ return CURRENT_LANG === 'ar' ? CATEGORIES_AR : CATEGORIES; }
  function getQuestions(){ return CURRENT_LANG === 'ar' ? QUESTIONS_AR_EMOJI : QUESTIONS_IT_EMOJI; }
  function getAnswers(){ return CURRENT_LANG === 'ar' ? ANSWERS_AR : ANSWERS; }
  function getResultContent(){ return CURRENT_LANG === 'ar' ? RESULT_CONTENT_AR : RESULT_CONTENT; }
  function applyStaticTexts(){
    const titleEl = document.getElementById('title');
    if(titleEl) titleEl.textContent = t('h1');
    const submitBtnEl = document.getElementById('submitBtn');
    if(submitBtnEl) submitBtnEl.textContent = t('submit');
    const errorEl = document.getElementById('error');
    if(errorEl) errorEl.textContent = t('error');
    document.title = t('pageTitle');
    const toggle = document.getElementById('langToggle');
    if(toggle){
      toggle.textContent = CURRENT_LANG === 'ar' ? '🇮🇹 IT' : '🇪🇬 AR';
      toggle.setAttribute('aria-label', CURRENT_LANG === 'ar' ? 'بدّل اللغة إلى الإيطالية' : 'Cambia lingua in arabo');
      toggle.title = CURRENT_LANG === 'ar' ? '🇮🇹 Italiano' : '🇪🇬 العربية';
    }
    // Emoji: flags + gift
    try{
      const toggle2 = document.getElementById('langToggle');
      if(toggle2){
        toggle2.textContent = CURRENT_LANG === 'ar' ? '🇮🇹 IT' : '🇪🇬 AR';
        toggle2.setAttribute('aria-label', CURRENT_LANG === 'ar' ? 'بدّل اللغة إلى الإيطالية' : 'Cambia lingua in arabo');
        toggle2.title = CURRENT_LANG === 'ar' ? '🇮🇹 Italiano' : '🇪🇬 العربية';
      }
      if(titleEl && !titleEl.textContent.includes('🎁')) titleEl.textContent += ' 🎁';
      if(document.title && !document.title.includes('🎁')) document.title += ' 🎁';
    }catch(e){}
  }
  function applyDirLang(){
    document.documentElement.lang = CURRENT_LANG === 'ar' ? 'ar-EG' : 'it';
    document.documentElement.dir = CURRENT_LANG === 'ar' ? 'rtl' : 'ltr';
    document.body.classList.toggle('rtl', CURRENT_LANG === 'ar');
  }
  function setLang(lang){
    CURRENT_LANG = (lang === 'ar') ? 'ar' : 'it';
    try{ localStorage.setItem('lang', CURRENT_LANG); }catch(e){}
    applyDirLang();
    applyStaticTexts();
    // rebuild UI
    buildCards();
    attachHandlers();
  }

  const ANSWERS = [
    // MANO
    { cat:"mano", text:"Penso a come è stato organizzato l’evento e mi offro di aiutare." },
    { cat:"mano", text:"Penso a chi avrà bisogno di aiuto dopo la preghiera." },
    { cat:"mano", text:"Team acquisti." },
    { cat:"mano", text:"Tecnico o media." },
    { cat:"mano", text:"Squadra montaggio/smontaggio e pulizie." },
    { cat:"mano", text:"Risolviamolo subito." },
    { cat:"mano", text:"Aiuterò con cucina o pulizie — qualunque cosa serva." },
    { cat:"mano", text:"Porto del cibo o mi offro per commissioni." },
    { cat:"mano", text:"Aiutare a sistemare le sedie o l’impianto audio." },
    { cat:"mano", text:"Organizzare la logistica e assicurarmi che tutto fili liscio." },
    { cat:"mano", text:"Aiutare praticamente ad accelerare le cose." },

    // BOCCA
    { cat:"bocca", text:"Avvio una conversazione calda e sicura." },
    { cat:"bocca", text:"Condivido la mia storia per aiutarlo/a a immedesimarsi." },
    { cat:"bocca", text:"Lo/la incoraggio con la Scrittura o con un consiglio." },
    { cat:"bocca", text:"Prego con coraggio e guido la preghiera." },
    { cat:"bocca", text:"Accoglienza/ospitalità." },
    { cat:"bocca", text:"Insegnare, guidare o parlare." },
    { cat:"bocca", text:"Insegniamo o diciamo la verità per aiutare." },
    { cat:"bocca", text:"Voglio guidare lo studio biblico." },
    { cat:"bocca", text:"Mando un vocale o un messaggio di incoraggiamento." },
    { cat:"bocca", text:"Assicurarti che i nuovi arrivati si sentano i benvenuti." },
    { cat:"bocca", text:"Prepararti a parlare, cantare o guidare." },
    { cat:"bocca", text:"Tenere un discorso motivazionale prima di iniziare." },
    { cat:"bocca", text:"Offrire una conclusione gioiosa o saggia." },

    // ORECCHIO
    { cat:"orecchio", text:"Mi siedo con lui/lei in silenzio e ascolto." },
    { cat:"orecchio", text:"Semplicemente ascolto e lo/la lascio elaborare." },
    { cat:"orecchio", text:"Ascolto e prego in silenzio." },
    { cat:"orecchio", text:"Sentiamo come si sentono le persone al riguardo." },
    { cat:"orecchio", text:"Ascolterò chi ha bisogno di parlare durante le pause." },
    { cat:"orecchio", text:"Lo/la chiamo o vado a trovarlo/a solo per ascoltare." },
    { cat:"orecchio", text:"Sederti in fondo e osservare dove le persone hanno bisogno di aiuto." },
    { cat:"orecchio", text:"Connettermi uno-a-uno con i timidi o i feriti." },
    { cat:"orecchio", text:"Restare a parlare con chi ne ha bisogno." },

    // PIEDE
    { cat:"piede", text:"Lo/la presento agli altri e lo/la includo." },
    { cat:"piede", text:"Lo/la aiuto a fare un piano o a passare all’azione." },
    { cat:"piede", text:"Faccio una metania ogni volta che posso." },
    { cat:"piede", text:"Andiamo a fare qualcosa al riguardo." },
    { cat:"piede", text:"Vado a invitare chi non pensava di venire." },
    { cat:"piede", text:"Raduno altri per andare a trovarlo/a o aiutarlo/a." },
    { cat:"piede", text:"Uscire a salutare i ritardatari o invitare i passanti." },
    { cat:"piede", text:"Guidare l’uscita/evangelizzazione o andare a parlare con le persone." },
    { cat:"piede", text:"Passare a controllare gli altri team e offrire aiuto." },

    // CUORE
    { cat:"cuore", text:"Prego per lui/lei in silenzio da lontano." },
    { cat:"cuore", text:"Prego con lui/lei subito." },
    { cat:"cuore", text:"Mi emoziono o mi sento profondamente connesso/a ai bisogni degli altri." },
    { cat:"cuore", text:"Preghiera." },
    { cat:"cuore", text:"Preghiamo prima." },
    { cat:"cuore", text:"Pregherò in silenzio per tutti durante il ritiro." },
    { cat:"cuore", text:"Prego subito per la sua guarigione." },
    { cat:"cuore", text:"Trovare un angolo tranquillo per pregare per chi partecipa." },
    { cat:"cuore", text:"Pregare perché la presenza di Dio riempia la giornata." },
    { cat:"cuore", text:"Pregare in silenzio per pace e pazienza." },

    // OCCHIO
    { cat:"occhio", text:"Osservo da lontano e percepisco che c’è qualcosa di più profondo." },
    { cat:"occhio", text:"Colgo i suoi sentimenti senza molte parole." },
    { cat:"occhio", text:"Resto spiritualmente vigile su ciò che sta accadendo." },
    { cat:"occhio", text:"Capiremo cosa sta davvero succedendo." },
    { cat:"occhio", text:"Resto in fondo a osservare cosa sta accadendo." },
    { cat:"occhio", text:"Osservo in silenzio per capire quali bisogni pratici ha davvero." },
    { cat:"occhio", text:"Discernere di cosa hanno bisogno le persone anche se non lo dicono." },
    { cat:"occhio", text:"Osservare per capire perché si verificano i ritardi." },
  ];

  const TIE_BREAK = ["mano","bocca","orecchio","piede","cuore","occhio"];

  function shuffle(arr){
    for(let i=arr.length-1;i>0;i--){
      const j = Math.floor(Math.random()*(i+1));
      [arr[i],arr[j]] = [arr[j],arr[i]];
    }
    return arr;
  }

  function buildCards(){
    const container = document.getElementById("quiz");
    if(!container) return;
    container.innerHTML = "";
    // Assicurati che il bottone sia nascosto su mobile all'inizio
    try{
      const actions = document.querySelector('.actions');
      actions?.classList.remove('show-on-mobile');
      document.body.classList.remove('mobile-actions-shown');
    }catch(e){}
    const Q = getQuestions();
    const A = getAnswers();
    Q.forEach((qText, idx) => {
      const card = document.createElement("section");
      card.className = "card-q" + (idx===0 ? "" : " hidden");
      card.dataset.index = String(idx);

      const h3 = document.createElement("h3");
      h3.textContent = qText;
      card.appendChild(h3);

      // Mini progress (10 dots)
      const mini = document.createElement('div');
      mini.className = 'mini-progress';
      mini.setAttribute('role','progressbar');
      mini.setAttribute('aria-valuemin','1');
      mini.setAttribute('aria-valuemax', String(Q.length));
      mini.setAttribute('aria-valuenow', String(idx+1));
      for(let d=0; d<Q.length; d++){
        const dot = document.createElement('span');
        dot.className = 'dot' + (d < idx+1 ? ' filled' : '');
        mini.appendChild(dot);
      }
      card.appendChild(mini);

      const optsWrap = document.createElement("div");
      optsWrap.className = "options-list";

      const name = `q${idx+1}`;
      const options = shuffle([...A]).slice(0, 5);
      options.forEach((opt, oi) => {
        const id = `${name}-opt${oi+1}`;
        const label = document.createElement("label");
        label.className = "opt";

        const input = document.createElement("input");
        input.type = "radio";
        input.name = name;
        input.id = id;
        input.value = opt.text;
        input.required = (idx===0);
        input.dataset.cat = opt.cat;

        const span = document.createElement("span");
        span.textContent = opt.text;

        label.appendChild(input);
        label.appendChild(span);
        optsWrap.appendChild(label);
      });

      card.appendChild(optsWrap);
      container.appendChild(card);
    });
  }

  function revealNext(currentIdx){
    const next = document.querySelector(`.card-q[data-index="${currentIdx+1}"]`);
    if(next && next.classList.contains("hidden")){
      next.classList.remove("hidden");
      next.querySelectorAll('input[type="radio"]').forEach(r => r.required = true);
      next.scrollIntoView({behavior:"smooth", block:"start"});
    }else if(!next){
      const actions = document.querySelector(".actions");
      // Su schermi piccoli mostra il bottone solo alla fine
      const isSmall = window.matchMedia && window.matchMedia('(max-width: 768px)').matches;
      if(isSmall && actions){
        actions.classList.add('show-on-mobile');
        // Abilita lo scroll verticale della pagina quando il bottone appare
        document.body.classList.add('mobile-actions-shown');
      }
      actions && actions.scrollIntoView({behavior:"smooth", block:"center"});
    }
  }

  function attachHandlers(){
    // Ritarda il passaggio alla prossima card per mostrare il colore selezionato
    const nextTimers = new Map(); // idx -> timeout id
    document.querySelectorAll(".card-q").forEach(card => {
      const idx = Number(card.dataset.index);
      card.querySelectorAll('input[type="radio"]').forEach(radio => {
        radio.addEventListener("change", () => {
          const err = document.getElementById("error");
          if(err) err.style.display = "none";
          // Annulla eventuale timer precedente su questa card
          const pending = nextTimers.get(idx);
          if(pending) clearTimeout(pending);
          // Attendi 3 secondi prima di rivelare la prossima card
          const t = setTimeout(() => {
            revealNext(idx);
            nextTimers.delete(idx);
          }, 350);
          nextTimers.set(idx, t);
        });
      });
    });

    const submitBtn = document.getElementById("submitBtn");
    submitBtn?.addEventListener("click", () => {
      const calc = computeResult();
      if(calc.error){
        const err = document.getElementById("error");
        if(err) err.style.display = "block";
        // mostra prima card incompleta
        const Q = getQuestions();
        for(let i=0;i<Q.length;i++){
          const checked = document.querySelector(`input[name="q${i+1}"]:checked`);
          const card = document.querySelector(`.card-q[data-index="${i}"]`);
          if(!checked && card){
            card.classList.remove("hidden");
            card.scrollIntoView({behavior:"smooth", block:"start"});
            break;
          }
        }
        return;
      }
      showResult(calc);
    });
  }

  function computeResult(){
    const totals = { mano:0, bocca:0, orecchio:0, piede:0, cuore:0, occhio:0 };
    const Q = getQuestions();
    for(let i=0;i<Q.length;i++){
      const name = `q${i+1}`;
      const checked = document.querySelector(`input[name="${name}"]:checked`);
      if(!checked) return { error:true };
      const cat = checked.dataset.cat;
      if(cat in totals) totals[cat]++;
    }

    const over = Object.entries(totals).filter(([k,v]) => v > 2);
    let winnerKey;
    if(over.length){
      const max = Math.max(...over.map(([k,v])=>v));
      const winners = over.filter(([k,v])=>v===max).map(([k])=>k);
      winnerKey = tiePick(winners);
    }else{
      const max = Math.max(...Object.values(totals));
      const winners = Object.entries(totals).filter(([k,v])=>v===max).map(([k])=>k);
      winnerKey = tiePick(winners);
    }

    return { error:false, totals, winnerKey };
  }

  function tiePick(keys){
    if(keys.length===1) return keys[0];
    for(const pref of TIE_BREAK){
      if(keys.includes(pref)) return pref;
    }
    return keys[0];
  }

  function showResult(calc){
    const { winnerKey, totals } = calc;
    const label = (getCategories()[winnerKey]?.label) || winnerKey;

    const scoreList = Object.entries(totals)
      .map(([k,v]) => `${CATEGORIES[k].label.replace(/^[^A-Za-zÀ-ÿ]+/,'')}: <strong>${v}</strong>`)
      .join(" · ");

    const resultEl = document.getElementById("result");
    if(!resultEl) return;
    const content = getResultContent()[winnerKey] || `<h2>${label}</h2>`;
    resultEl.innerHTML = `${content}`;
    // Mostra il risultato a tutto schermo: nascondi quiz/azioni ed espandi la sezione risultato
    const quiz = document.getElementById("quiz");
    const actions = document.querySelector(".actions");
    const err = document.getElementById("error");
    // Ripristina overflow body per evitare effetti collaterali
    document.body.classList.remove('mobile-actions-shown');
    if(quiz) quiz.style.display = "none";
    if(actions) actions.style.display = "none";
    if(err) err.style.display = "none";

    resultEl.style.display = "block";
    resultEl.classList.add("fullscreen");
    // Porta in vista l'inizio della card
    const card = document.querySelector('.card');
    (card || resultEl).scrollIntoView({behavior:"smooth", block:"start"});
  }

  // Bootstrap
  
// Accurate mobile viewport height (iOS/Android address bar aware)
function setVhUnit(){
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}
window.addEventListener('resize', setVhUnit);
window.addEventListener('orientationchange', setVhUnit);
setVhUnit();

  document.addEventListener("DOMContentLoaded", () => {
    applyDirLang();
    applyStaticTexts();
    buildCards();
    attachHandlers();
    const toggle = document.getElementById('langToggle');
    toggle?.addEventListener('click', () => setLang(getLang()==='ar' ? 'it' : 'ar'));
  });
})();
